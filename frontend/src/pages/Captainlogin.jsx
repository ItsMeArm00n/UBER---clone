import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import appLogo3 from '../assets/app logo3.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import Button from '../Components/Button'
import Input from '../Components/Input'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async(e) => {
    e.preventDefault()
    const captain ={
      email: email,
      password: password  
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    if (response.status === 200) {  
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      localStorage.setItem('captainId', data.captain._id) // Store captain ID for socket events
      navigate('/captain-home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className="h-screen p-6 flex flex-col justify-between bg-white">
      {/* Logo and Form */}
      <div>
        <img src={appLogo3} alt="Safar Logo" className="w-24 h-24 mb-2" />

        <form onSubmit={submitHandler} className="max-w-md">
          <Input
            label="What's our Captain's email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-5"
          />

          <Input
            label="Enter Password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" fullWidth>
            Login
          </Button>

          <p className="text-center text-base">
            Join a fleet?{' '}
            <Link to="/captainsignup" className="text-blue-600 hover:underline">
              Register as Captain
            </Link>
          </p>
        </form>
      </div>

      {/* Bottom switch button */}
      <div>
        <Link to="/Login">
          <Button variant="warning" fullWidth>
            Sign in as User
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
