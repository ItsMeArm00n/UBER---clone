import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import appLogo3 from '../assets/app logo3.png'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const ridePopUpPanelRef = useRef(null)

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null)

  // Animate Ride Popup
  useGSAP(() => {
    if (!ridePopUpPanelRef.current) return
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [ridePopUpPanel])

  // Animate Confirm Ride Popup
  useGSAP(() => {
    if (!confirmRidePopUpPanelRef.current) return
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      {/* Top bar */}
      <div className='fixed top-0 left-0 w-full p-3 flex items-center justify-between z-10 -mt-2'>
        <img src={appLogo3} alt='Safar Logo' className='w-24' />

        {/* Logout icon */}
        <Link
          to='/captain/logout'
          className='h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-white'
        >
          <i className='text-lg ri-logout-box-r-line'></i>
        </Link>
      </div>

      {/* Top background */}
      <div className='h-3/5'>
        <img
          className='h-full w-full object-cover'
          src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'
          alt=''
        />
      </div>

      {/* Bottom card */}
      <div className='h-2/5 bg-white rounded-t-xl shadow-md p-4 flex flex-col'>
        <CaptainDetails />
      </div>

      {/* Ride Popup */}
      <div
        ref={ridePopUpPanelRef}
        className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 translate-y-full rounded-t-xl shadow-lg'
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div
        ref={confirmRidePopUpPanelRef}
        className='fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 translate-y-full rounded-t-xl shadow-lg'
      >
        <ConfirmRidePopUp
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
