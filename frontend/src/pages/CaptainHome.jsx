import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import appLogo3 from '../assets/app logo3.png'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import CaptainMap from '../Components/CaptainMap'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import socket from '../utils/socket'

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const ridePopUpPanelRef = useRef(null)

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null)

  // Store current ride request data
  const [currentRide, setCurrentRide] = useState(null)
  
  // Load accepted ride data from localStorage for map display
  const [acceptedRide, setAcceptedRide] = useState(null)

  useEffect(() => {
    // Check if there's an accepted ride in localStorage
    const storedRide = localStorage.getItem('currentRide')
    if (storedRide) {
      try {
        const rideData = JSON.parse(storedRide)
        setAcceptedRide(rideData)
        console.log('📍 Loaded accepted ride for map:', rideData)
      } catch (e) {
        console.error('Error parsing stored ride:', e)
      }
    }
  }, [confirmRidePopUpPanel]) // Reload when OTP screen opens/closes

  // Connect to Socket.IO as captain and listen for new ride requests
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Register captain as online with initial location
      socket.emit('captain:online', { token });
      console.log('Captain connected to socket.io');
    }

    const onRideNew = (payload) => {
      // Store ride data and open the ride popup
      console.log('🚗 New ride request received:', payload);
      setCurrentRide(payload);
      setRidePopUpPanel(true);
      
      // Play notification sound (optional)
      // new Audio('/notification.mp3').play().catch(e => console.log('Audio play failed'));
    };

    const onRideTaken = (payload) => {
      // Another driver accepted this ride, close the popup
      console.log('Ride taken by another driver:', payload.rideId);
      if (currentRide?.rideId === payload.rideId) {
        setRidePopUpPanel(false);
        setCurrentRide(null);
      }
    };

    socket.on('ride:new', onRideNew);
    socket.on('ride:taken', onRideTaken);

    return () => {
      socket.off('ride:new', onRideNew);
      socket.off('ride:taken', onRideTaken);
    };
  }, [currentRide])

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

      {/* OpenStreetMap - Captain's current location */}
      <div className='h-3/5'>
        <CaptainMap 
          pickupLocation={acceptedRide?.pickup ? {
            lat: acceptedRide.pickup.lat,
            lng: acceptedRide.pickup.lng,
            address: acceptedRide.pickup.address
          } : null}
          dropoffLocation={acceptedRide?.dropoff ? {
            lat: acceptedRide.dropoff.lat,
            lng: acceptedRide.dropoff.lng,
            address: acceptedRide.dropoff.address
          } : null}
          showRoute={!!acceptedRide}
          autoFitBounds={!!acceptedRide}
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
          rideData={currentRide}
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
