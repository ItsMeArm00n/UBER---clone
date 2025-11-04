import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appLogo3 from '../assets/app logo3.png';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Captain signup form submitted');

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    console.log('Sending captain signup request:', captainData);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      console.log('Captain signup response:', response);
      
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        localStorage.setItem('captainId', data.captain._id); // Store captain ID
        console.log('Captain signup successful, navigating to /captain-home');
        navigate('/captain-home');
      }

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Captain signup error:', error);
      setError(error.response?.data?.message || 'Failed to create captain account. Please try again.');
    } finally {
      setLoading(false);
    }
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <img src={appLogo3} alt="Safar Logo" className="w-24 h-auto" />
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-6">
        <form onSubmit={submitHandler} className="w-full max-w-lg mx-auto space-y-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {/* Name Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">What's our Captain's name</h3>
            <div className="flex">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                size="lg"
                className="mb-0"
                containerClassName="flex-1 mr-2"
              />
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                size="lg"
                className="mb-0"
                containerClassName="flex-1 ml-2"
              />
            </div>
          </div>

          {/* Email Section */}
          <div>
            <Input
              label="What's our Captain's email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-0"
              size="lg"
              labelClassName="text-xl"
            />
          </div>

          {/* Password Section */}
          <div>
            <Input
              label="Enter Password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-0"
              size="lg"
              labelClassName="text-xl"
            />
          </div>

          {/* Vehicle Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Vehicle Information</h3>

            {/* Color and Plate Row */}
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                required
                size="lg"
                className="mb-0"
                containerClassName="flex-1 mr-2"
              />
              <Input
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
                size="lg"
                className="mb-0"
                containerClassName="flex-1 ml-2"
              />
            </div>

            {/* Capacity and Type Row */}
            <div className="flex mb-4">
              <Input
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                required
                size="lg"
                className="mb-0"
                containerClassName="flex-1 mr-2"
              />
              <div className="flex-1 ml-2">
                <select
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="bg-[#eeeeee] rounded px-4 border focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all py-4 text-xl w-full mb-0"
                >
                  <option value="" disabled>Select Vehicle</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" variant="primary" fullWidth size="large" disabled={loading}>
              {loading ? 'Creating Captain Account...' : 'Create Captain Account'}
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-base pt-2">
            Already have an account?{' '}
            <Link to="/captainlogin" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-[10px] text-gray-500 text-center border-t border-gray-200 mt-8">
        This site is protected by reCAPTCHA and the
        <span className="underline"> Google Privacy Policy </span> and
        <span className="underline"> Terms of Service apply</span>.
      </div>
    </div>
  );
};

export default CaptainSignup;