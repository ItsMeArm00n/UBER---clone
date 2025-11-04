import React, { useContext } from 'react'
import socket from '../utils/socket';
import { UserDataContext } from '../context/UserContext';

const ConfirmRide = (props) => {
  const { user } = useContext(UserDataContext);
  
  // Get dynamic fare from localStorage
  const selectedFare = localStorage.getItem('selectedFare') || 
                       localStorage.getItem('fareCar') || 
                       localStorage.getItem('fareBase') || 
                       '199';
  
  const handleConfirmRide = () => {
    // Get ride details from localStorage and props
    const pickupAddress = localStorage.getItem('pickupAddress') || 'Pickup Location';
    const dropoffAddress = localStorage.getItem('dropoffAddress') || 'Dropoff Location';
    const pickupLat = localStorage.getItem('pickupLat');
    const pickupLng = localStorage.getItem('pickupLng');
    const dropoffLat = localStorage.getItem('dropoffLat');
    const dropoffLng = localStorage.getItem('dropoffLng');
    const vehicleType = localStorage.getItem('selectedVehicleType') || 'Car';
    const userName = user?.fullname?.firstname || localStorage.getItem('userName') || 'User';
    
    // Store userName for later use
    if (user?.fullname?.firstname) {
      localStorage.setItem('userName', user.fullname.firstname);
    }
    
    // Generate a unique ride ID
    const rideId = `ride_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Broadcast ride request to all online drivers
    // Backend expects: { rideId, pickup, dropoff, user, fare }
    const rideData = {
      rideId,
      pickup: {
        lat: parseFloat(pickupLat),
        lng: parseFloat(pickupLng),
        address: pickupAddress
      },
      dropoff: {
        lat: parseFloat(dropoffLat),
        lng: parseFloat(dropoffLng),
        address: dropoffAddress
      },
      user: {
        _id: user?._id,
        name: userName
      },
      fare: selectedFare,
      vehicleType,
      timestamp: Date.now()
    };
    
    console.log('Broadcasting ride request:', rideData);
    socket.emit('ride:broadcast', rideData);
    
    // Join the ride room to receive acceptance notifications
    socket.emit('ride:join', { rideId });
    console.log(`User joined ride room: ride:${rideId}`);
    
    // Store ride ID for later
    localStorage.setItem('currentRideId', rideId);
    
    // Update UI to show "Looking for driver"
    props.setVehicleFound(true);
    props.setConfirmRidePanel(false);
  };
  
  return (
    <div>
      <h5
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {props.setConfirmRidePanel(false)}}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5 mt-0'>Confirm your Ride</h3>

      <div className='flex flex-col gap-2  items-center'>
        <img
          className='h-24'
          src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png'
          alt=' '
        />

        <div className='w-full mt-5'>
          {/* Pickup address */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Tablab, Delhi</p>
            </div>
          </div>

          {/* Destination address */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Tablab, Delhi</p>
            </div>
          </div>

          {/* Price */}
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{selectedFare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>

        <button onClick={handleConfirmRide}
          className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
