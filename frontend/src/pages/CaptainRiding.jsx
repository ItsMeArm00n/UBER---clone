import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import appLogo3 from '../assets/app logo3.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../Components/FinishRide'
import CaptainMap from '../Components/CaptainMap'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  
  // Sample pickup and dropoff locations - replace with actual data from your ride context
  const pickupLocation = {
    lat: 28.6139,
    lng: 77.2090,
    address: "Pickup Point - Connaught Place, New Delhi"
  }
  
  const dropoffLocation = {
    lat: 28.5355,
    lng: 77.3910,
    address: "Drop-off Point - Noida Sector 18"
  }
  
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [finishRidePanel])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full p-3 flex items-center justify-between z-10 bg-transparent">
        <img src={appLogo3} alt="Safar Logo" className="w-20" />

        {/* Logout icon */}
        <Link
          to="/captainlogin"
          className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-md"
        >
          <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map with route, pickup and dropoff */}
      <div className="flex-1">
        <CaptainMap
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          showRoute={true}
          autoFitBounds={true}
        />
      </div>

      {/* Bottom ride details card */}
      <div className="h-[110px] bg-yellow-400 rounded-t-2xl shadow-lg p-4  flex flex-col"
        onClick={() => {setFinishRidePanel(true)}}>
        
        {/* Drag handle arrow */}
        <div className="w-full flex justify-center -mt-2">
          <i className="text-2xl text-gray-700 ri-arrow-up-s-line"></i>
        </div>

        {/* Content row */}
        <div className="flex items-center justify-between mt-2">
          <h4 className="text-xl py-2 px-6 font-semibold text-gray-900"> 4 Km Away</h4>
          <button className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md">
            Complete Ride
          </button>
        </div>
        
      </div>
      <div
        ref={finishRidePanelRef}
        className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 translate-y-full rounded-t-xl shadow-lg'
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>      
    </div>
  )
}

export default CaptainRiding

