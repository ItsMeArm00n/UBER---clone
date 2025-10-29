import React, { useContext, useState } from 'react'import React from 'react'

import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

const CaptainDetails = () => {  return (

  const { captain, updateCaptainStatus } = useContext(CaptainDataContext);    <div>

  const [isOnline, setIsOnline] = useState(captain?.status === 'online');        <div className='flex items-center justify-between'>

  const [isUpdating, setIsUpdating] = useState(false);          <div className='flex items-center gap-3'>

            <img className='h-10 w-10 rounded-full object-cover' src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg" alt=""/>

  const handleStatusToggle = async () => {            <h4 className='text-lg font-medium'>Harsh Patel</h4>

    setIsUpdating(true);          </div>

    try {          <div className='text-right'>

      const newStatus = isOnline ? 'offline' : 'online';            <h4 className='text-xl font-semibold'>₹295.20</h4>

      await updateCaptainStatus(newStatus);            <p className='text-sm text-gray-600'>Earned</p>

      setIsOnline(!isOnline);          </div>

    } catch (error) {        </div>

      console.error('Failed to update status:', error);

      alert('Failed to update status. Please try again.');        <div className='mt-8 flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-center'>

    } finally {          <div className='text-center'>

      setIsUpdating(false);            <i className="text-3xl mb-2 ri-timer-2-line"></i>

    }            <h5 className='text-lg font-medium'>10.2</h5>

  };            <p className='text-sm text-gray-600'>Hours Online</p>

          </div>

  return (          <div className='text-center'>

    <div>            <i className="text-3xl mb-2 ri-speed-up-line"></i>

        <div className='flex items-center justify-between'>            <h5 className='text-lg font-medium'>30 Km</h5>

          <div className='flex items-center gap-3'>            <p className='text-sm text-gray-600'>Distance Driven</p>

            <img className='h-10 w-10 rounded-full object-cover' src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg" alt=""/>          </div>

            <h4 className='text-lg font-medium'>{captain?.fullname?.firstname || 'Harsh'} {captain?.fullname?.lastname || 'Patel'}</h4>          <div className='text-center'>

          </div>            <i className="text-3xl mb-2 ri-booklet-line"></i>

          <div className='text-right'>            <h5 className='text-lg font-medium'>14</h5>

            <h4 className='text-xl font-semibold'>₹295.20</h4>            <p className='text-sm text-gray-600'>Trips Completed</p>

            <p className='text-sm text-gray-600'>Earned</p>          </div>

          </div>        </div>        

        </div>    </div>

  )

        {/* Status Toggle */}}

        <div className='mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-xl'>

          <div className='flex items-center gap-3'>export default CaptainDetails
            <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className='text-lg font-medium'>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <button
            onClick={handleStatusToggle}
            disabled={isUpdating}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isOnline ? 'bg-green-500 focus:ring-green-500' : 'bg-gray-300 focus:ring-gray-400'
            } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                isOnline ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className='mt-6 flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-center'>
          <div className='text-center'>
            <i className="text-3xl mb-2 ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>30 Km</h5>
            <p className='text-sm text-gray-600'>Distance Driven</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl mb-2 ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>14</h5>
            <p className='text-sm text-gray-600'>Trips Completed</p>
          </div>
        </div>        
    </div>
  )
}

export default CaptainDetails
