import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import appLogo2 from '../assets/app logo2.png'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    }

    
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }

      // Clear inputs
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
   
  }

  return (
    <div className="h-screen p-6 flex flex-col justify-between bg-white">
      {/* Logo at Top-Left */}
      <div>
        <img src={appLogo2} alt="Safar Logo" className="w-24 h-24 mb-1" />

        <form onSubmit={submitHandler} className="max-w-md mx-auto">
          <h3 className="text-lg w-full font-medium mb-2">What's your name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-semibold mb-2">Create Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg"
          >
            Create account
          </button>

          <p className="text-center text-lg">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Terms Text */}
      <div>
        <p className='text-[10px] text-gray-500 leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
