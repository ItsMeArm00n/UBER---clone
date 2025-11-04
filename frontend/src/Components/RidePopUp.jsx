import React from 'react'
import socket from '../utils/socket'

const RidePopUp = (props) => {
  const { rideData } = props;
  
  // Get fare from ride data or fallback to localStorage
  const fare = rideData?.fare || 
               localStorage.getItem('selectedFare') || 
               localStorage.getItem('fareCar') || 
               localStorage.getItem('fareBase') || 
               '199';
  
  // Get user name or default
  const userName = rideData?.user?.fullname?.firstname || rideData?.user?.name || 'User';
  
  // Get pickup and dropoff addresses
  const pickupAddress = rideData?.pickup?.address || 'Pickup Location';
  const dropoffAddress = rideData?.dropoff?.address || 'Destination';
  
  // Calculate distance (you can enhance this with actual calculation)
  const distance = rideData?.distance || '2.2 KM';
  
  const handleAcceptRide = () => {
    const token = localStorage.getItem('token');
    let captainId = localStorage.getItem('captainId');
    
    // If captainId is not in localStorage, try to decode from token
    if (!captainId && token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        captainId = payload._id;
        // Store it for future use
        localStorage.setItem('captainId', captainId);
        console.log('🔑 Extracted captainId from token:', captainId);
      } catch (e) {
        console.error('Failed to decode token:', e);
      }
    }
    
    if (rideData?.rideId) {
      console.log('✅ Accepting ride:', rideData.rideId, 'Captain ID:', captainId);
      
      // Emit ride acceptance to backend
      socket.emit('ride:accept', {
        rideId: rideData.rideId,
        captainId: captainId,
        token: token
      });
      
      // Join the ride room to receive location updates
      socket.emit('ride:join', { rideId: rideData.rideId });
      
      // Store ride data for later use
      localStorage.setItem('currentRide', JSON.stringify(rideData));
    }
    
    // Just close the popup - captain can see ride details on main screen
    // ConfirmRidePopUp (with OTP) will be shown when captain arrives at pickup
    props.setRidePopUpPanel(false);
  };
  
  const handleRejectRide = () => {
    const token = localStorage.getItem('token');
    const captainId = localStorage.getItem('captainId');
    
    if (rideData?.rideId) {
      console.log('❌ Rejecting ride:', rideData.rideId);
      
      // Emit ride rejection to backend
      socket.emit('ride:reject', {
        rideId: rideData.rideId,
        captainId: captainId,
        token: token
      });
    }
    
    props.setRidePopUpPanel(false);
  };
  
  return (
    <div>
      {/* Close Button */}
      <h5
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => props.setRidePopUpPanel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5 mt-0'>New Ride Available!</h3>

      {/* Rider Info */}
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover'
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="rider"
          />
          <h2 className='text-xl font-medium'>{userName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>{distance}</h5>
      </div>

      {/* Ride Details */}
      <div className='flex flex-col gap-2 items-center'>
        <div className='w-full mt-5'>
          {/* Pickup */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm -mt-1 text-gray-600'>{pickupAddress}</p>
            </div>
          </div>

          {/* Destination */}
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-600'>{dropoffAddress}</p>
            </div>
          </div>

          {/* Price */}
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center justify-between w-full mt-5'>
          <button
            onClick={handleRejectRide}
            className='bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'
          >
            Ignore
          </button>        

          <button
            onClick={handleAcceptRide}
            className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp
