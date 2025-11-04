import React from 'react'

const WaitingForDriver = (props) => {
  // Get dynamic fare from localStorage
  const selectedFare = localStorage.getItem('selectedFare') || 
                       localStorage.getItem('fareCar') || 
                       localStorage.getItem('fareBase') || 
                       '199';
  
  return (
    <div>
      <h5
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {props.setWaitingForDriver(false)}}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img
          className='h-20'
          src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png'
          alt=' '
        /> 
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Kajal</h2> 
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>DL 9C AZ 8855</h4> 
          <p className='text-sm text-gray-600'>Tata Tigor</p>
        </div>       
      </div>
      <div className='flex flex-col gap-2  items-center'>


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


      </div>
    </div>    
  )
}

export default WaitingForDriver