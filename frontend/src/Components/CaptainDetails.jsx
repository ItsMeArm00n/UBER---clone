import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain, updateCaptainStatus } = useContext(CaptainDataContext)
  const [isOnline, setIsOnline] = useState(captain?.status === 'online')
  const [isUpdating, setIsUpdating] = useState(false)

  // Keep local toggle in sync with captain status from context
  useEffect(() => {
    setIsOnline(captain?.status === 'online')
  }, [captain?.status])

  const handleStatusToggle = async () => {
    setIsUpdating(true)
    try {
      const newStatus = isOnline ? 'offline' : 'online'
      await updateCaptainStatus(newStatus)
      setIsOnline(!isOnline)
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update status. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img
            className='h-10 w-10 rounded-full object-cover'
            src='https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg'
            alt=''
          />
          <h4 className='text-lg font-medium'>
            {captain?.fullname?.firstname || 'Harsh'}{' '}
            {captain?.fullname?.lastname || 'Patel'}
          </h4>
        </div>
        <div className='text-right'>
          <h4 className='text-xl font-semibold'>₹295.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>

      {/* Status Toggle */}
      <div className='mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-xl'>
        <div className='flex items-center gap-3'>
          <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className='text-base font-medium'>{isOnline ? 'Online' : 'Offline'}</span>
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

      <div className='mt-4 flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-center'>
        <div className='text-center'>
          <i className='text-3xl mb-2 ri-timer-2-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className='text-3xl mb-2 ri-speed-up-line'></i>
          <h5 className='text-lg font-medium'>30 Km</h5>
          <p className='text-sm text-gray-600'>Distance Driven</p>
        </div>
        <div className='text-center'>
          <i className='text-3xl mb-2 ri-booklet-line'></i>
          <h5 className='text-lg font-medium'>14</h5>
          <p className='text-sm text-gray-600'>Trips Completed</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
