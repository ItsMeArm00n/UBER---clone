import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token')
          navigate('/captainlogin')
        }
      })
      .catch(() => {
        // Even if logout request fails, clear token and navigate
        localStorage.removeItem('token')
        navigate('/captainlogin')
      })
  }, [])

  return <div>Logging out...</div>
}

export default CaptainLogout