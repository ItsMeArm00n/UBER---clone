import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import appLogo2 from '../assets/app logo2.png'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import Button from '../Components/Button'
import Input from '../Components/Input'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    console.log('Signup form submitted')

    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    }

    console.log('Sending signup request:', newUser)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      console.log('Signup response:', response)
      
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        console.log('Signup successful, navigating to /home')
        navigate('/home')
      }

      // Clear inputs
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Signup error:', error)
      setError(error.response?.data?.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-7 flex flex-col justify-between bg-white">
      {/* Logo */}
      <div>
        <img src={appLogo2} alt="Safar Logo" className="w-24 h-24 mb-2" />

        <form onSubmit={submitHandler} className="max-w-lg mx-auto space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {/* Name Section */}
          <div>
            <h3 className="text-xl font-medium mb-4">What's your name</h3>
            <div className='flex'>
              <Input
                type="text"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                size="lg"
                className="mb-0 flex-1 mr-2"
              />
              <Input
                type="text"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                size="lg"
                className="mb-0 flex-1 ml-2"
              />
            </div>
          </div>

          {/* Email Section */}
          <div>
            <Input
              label="What's your email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="lg"
              className="mb-0"
              labelClassName="text-xl"
            />
          </div>

          {/* Password Section */}
          <div>
            <Input
              label="Create Password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="lg"
              className="mb-0"
              labelClassName="text-xl"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-base pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Terms Text */}
      <div className="mt-8">
        <p className='text-[10px] text-gray-500 leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
