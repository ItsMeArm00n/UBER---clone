const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const captainModel = require('./models/captain.model');
const userModel = require('./models/user.model');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);

    // Captain comes online and registers their socket
    socket.on('captain:online', async ({ token, location } = {}) => {
      console.log('👮 Captain going online:', socket.id);
      try {
        if (!token) {
          console.log('❌ No token provided');
          return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token verified for captain:', decoded._id);
        
        const captain = await captainModel.findByIdAndUpdate(
          decoded._id,
          {
            socketId: socket.id,
            status: 'online',
            ...(location?.lat && location?.lng
              ? { location: { lat: location.lat, lng: location.lng } }
              : {}),
          },
          { new: true }
        );
        if (!captain) {
          console.log('❌ Captain not found');
          return;
        }
        
        console.log('✅ Captain joined drivers:online room:', captain.fullname);
        // Join a general room for available drivers
        socket.join('drivers:online');
      } catch (e) {
        console.log('❌ Error in captain:online:', e.message);
        // ignore invalid token
      }
    });

    // Captain updates their live location (optionally for a specific ride)
    socket.on('captain:location', async ({ token, lat, lng, rideId } = {}) => {
      try {
        if (!token || typeof lat !== 'number' || typeof lng !== 'number') return;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await captainModel.findByIdAndUpdate(decoded._id, {
          location: { lat, lng },
        });
        if (rideId) {
          io.to(`ride:${rideId}`).emit('driver:location', { lat, lng, rideId });
        }
      } catch (e) {
        // silently fail
      }
    });

    // Allow both user and captain to join a specific ride room
    socket.on('ride:join', ({ rideId } = {}) => {
      if (!rideId) return;
      socket.join(`ride:${rideId}`);
    });

    // Simple server-driven broadcast for a new ride request to all online drivers
    // payload: { rideId, pickup: {lat,lng,address?}, dropoff: {lat,lng,address?}, user: { _id, name? }, fare }
    socket.on('ride:broadcast', ({ rideId, pickup, dropoff, user, fare } = {}) => {
      console.log('🚗 Ride broadcast received:', { rideId, pickup, dropoff, user, fare });
      if (!rideId || !pickup || !dropoff) {
        console.log('❌ Missing required ride data');
        return;
      }
      console.log('📢 Broadcasting ride to drivers:online room');
      io.to('drivers:online').emit('ride:new', { rideId, pickup, dropoff, user, fare, timestamp: Date.now() });
      console.log('✅ Ride broadcast sent');
    });

    // Captain accepts a ride
    socket.on('ride:accept', async ({ rideId, captainId, token } = {}) => {
      console.log('✅ Captain accepting ride:', { rideId, captainId });
      try {
        if (!token || !rideId || !captainId) {
          console.log('❌ Missing required data for ride:accept');
          return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded._id !== captainId) {
          console.log('❌ Captain ID mismatch');
          return; // verify captain owns this token
        }
        
        // Get captain details
        const captain = await captainModel.findById(captainId);
        if (!captain) {
          console.log('❌ Captain not found');
          return;
        }
        
        console.log(`Captain ${captain.fullname.firstname} accepted ride ${rideId}`);
        
        // Notify the user that their ride has been accepted
        // Emit to the ride room (user should have joined)
        io.to(`ride:${rideId}`).emit('ride:accepted', { 
          rideId, 
          driver: {
            _id: captain._id,
            name: `${captain.fullname.firstname} ${captain.fullname.lastname}`,
            vehicle: captain.vehicle,
            location: captain.location
          },
          message: 'Driver accepted your ride!',
          timestamp: Date.now()
        });
        
        console.log(`✅ Emitted ride:accepted to ride:${rideId} room`);
        
        // Remove this ride from other drivers' notifications
        io.to('drivers:online').emit('ride:taken', { rideId });
        console.log('✅ Emitted ride:taken to other drivers');
        
      } catch (e) {
        console.error('Error accepting ride:', e);
      }
    });

    // Captain rejects a ride
    socket.on('ride:reject', ({ rideId, captainId, token } = {}) => {
      try {
        if (!token || !rideId) return;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`Captain ${decoded._id} rejected ride ${rideId}`);
        // Could implement logic to track rejections or re-broadcast
      } catch (e) {
        // silently fail
      }
    });

    socket.on('disconnect', async () => {
      try {
        const captain = await captainModel.findOne({ socketId: socket.id });
        if (captain) {
          captain.socketId = undefined;
          captain.status = 'offline';
          await captain.save();
        }
      } catch (e) {
        // ignore
      }
    });
  });

  console.log('Socket.io initialized');
}

function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}

module.exports = { initSocket, getIO };
