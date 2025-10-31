import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import appLogo2 from '../assets/app logo2.png'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(UserDataContext)
  const navigate= useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className="h-screen p-6 flex flex-col justify-between bg-white">
      {/* Logo at Top-Left */}
      <div>
        <img src={appLogo2} alt="Safar Logo" className="w-24 h-24 mb-1" />

        <form onSubmit={(e) => submitHandler(e)} className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-semibold mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>

          <p className="text-center text-base">
            New here?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      {/* Sign in as Captain Button */}
      <div>
        <Link to="/captainlogin" 
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg">
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
