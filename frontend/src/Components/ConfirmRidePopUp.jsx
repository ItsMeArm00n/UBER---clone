import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const [rideData, setRideData] = useState(null)
    const [otpConfirmed, setOtpConfirmed] = useState(false) // Track if OTP entered
    
    // Load ride data from localStorage
    useEffect(() => {
      const storedRide = localStorage.getItem('currentRide')
      if (storedRide) {
        try {
          setRideData(JSON.parse(storedRide))
        } catch (e) {
          console.error('Failed to parse ride data:', e)
        }
      }
    }, [])
    
    // Get dynamic fare from ride data or localStorage
    const fare = rideData?.fare || 
                 localStorage.getItem('selectedFare') || 
                 localStorage.getItem('fareCar') || 
                 localStorage.getItem('fareBase') || 
                 '199';
    
    // Get rider name
    const userName = rideData?.user?.name || 'User';
    
    // Get addresses
    const pickupAddress = rideData?.pickup?.address || 'Pickup Location';
    const dropoffAddress = rideData?.dropoff?.address || 'Destination';
    
    const handleEnterOtp = (e) => {
        e.preventDefault()
        // OTP is optional - can proceed even without entering it
        console.log('OTP entered (optional):', otp || 'None - Skipped')
        setOtpConfirmed(true) // Show "Start Ride" button
    }
    
  return (
    <div>
      {/* Close Button */}
      <h5
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => props.setConfirmRidePopUpPanel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5 mt-0'>Confirm Ride to Start</h3>

      {/* Rider Info */}
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover'
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="rider"
          />
          <h2 className='text-xl font-medium'>{userName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
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
        <div className='mt-6 w-full'>
        {!otpConfirmed ? (
          // Show OTP input with Enter/Cancel buttons
          <form onSubmit={handleEnterOtp}>
            <input 
              value={otp} 
              onChange={(e)=>setOtp(e.target.value)} 
              type="text" 
              placeholder='Enter OTP (Optional)' 
              className='w-full px-12 py-2 font-mono text-lg rounded-lg mt-3 bg-[#eee]'
            />
            <button
              type="submit"
              className='w-full mt-5 bg-green-600 text-white text-lg font-semibold p-3 rounded-lg'
            >
              Enter
            </button>
            <button
              type="button"
              onClick={() => {
                props.setConfirmRidePopUpPanel(false)
                props.setRidePopUpPanel(false)
              }}
              className='w-full mt-3 bg-red-500 text-white text-lg font-semibold p-3 rounded-lg'
            >
              Cancel
            </button>
          </form>
        ) : (
          // Show Start Ride button after OTP entered/skipped
          <div>
            <Link
              to='/captain-riding'
              className='w-full flex justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg'
            >
              Start Ride
            </Link>
            <button
              type="button"
              onClick={() => {
                setOtpConfirmed(false)
                setOtp('')
              }}
              className='w-full mt-3 bg-gray-300 text-lg text-gray-700 font-semibold p-3 rounded-lg'
            >
              Back
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
