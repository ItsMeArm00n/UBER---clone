import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    
    // Get dynamic fare from localStorage
    const selectedFare = localStorage.getItem('selectedFare') || 
                         localStorage.getItem('fareCar') || 
                         localStorage.getItem('fareBase') || 
                         '199';
    
    const submitHandler=(e)=>{
        e.preventDefault()
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

      <h3 className='text-2xl font-semibold mb-5 mt-0'>Confirm Ride</h3>

      {/* Rider Info */}
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover'
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="rider"
          />
          <h2 className='text-xl font-medium'>Harshita</h2>
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
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Tablab, Delhi</p>
            </div>
          </div>

          {/* Destination */}
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
        <div className='mt-6'>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder='Enter OTP' className='w-full px-12 py-2 font-mono text-lg rounded-lg mt-3 bg-[#eee]'/>
           <Link
            to='/captain-riding'
          className='w-full flex justify-center text-lg mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
           >
          Confirm
          </Link>
          <button
          onClick={() => {props.setConfirmRidePopUpPanel(false)
             props.setRidePopUpPanel(false)}}

          className='w-full mt-5 bg-gray-300 text-lg text-gray-700 font-semibold p-3 rounded-lg'
          >
          Cancel
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
