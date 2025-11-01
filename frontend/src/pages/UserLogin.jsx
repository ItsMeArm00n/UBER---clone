import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import appLogo2 from '../assets/app logo2.png'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../Components/Button'
import Input from '../Components/Input'

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
          <Input
            label="What's your email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            New here?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      {/* Sign in as Captain Button */}
      <div>
        <Link to="/captainlogin">
          <Button variant="success" fullWidth>
            Sign in as Captain
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
