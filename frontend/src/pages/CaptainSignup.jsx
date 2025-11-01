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
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();

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
        vehicleType: vehicleType
      }
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

  

    
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
  {/* Header */}
  <div className="p-4">
    <img src={appLogo3} alt="Safar Logo" className="w-20 h-auto" />
  </div>

  {/* Form */}
  <div className="flex-1 px-4">
    <form onSubmit={submitHandler} className="w-full max-w-md mx-auto space-y-6">
      
      {/* Name */}
      <div>
        <h3 className="text-lg font-semibold mb-2">What's our Captain's name</h3>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            halfWidth
            containerClassName="w-1/2"
            className="mb-0 text-sm py-3"
          />
          <Input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            halfWidth
            containerClassName="w-1/2"
            className="mb-0 text-sm py-3"
          />
        </div>
      </div>

      {/* Email */}
      <Input
        label="What's our Captain's email"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-0 text-sm py-3"
      />

      {/* Password */}
      <Input
        label="Enter Password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-0 text-sm py-3"
      />

      {/* Vehicle Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Vehicle Information</h3>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Vehicle Color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            required
            halfWidth
            containerClassName="w-1/2"
            className="mb-0 text-sm py-3"
          />
          <Input
            type="text"
            placeholder="Vehicle Plate"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            required
            halfWidth
            containerClassName="w-1/2"
            className="mb-0 text-sm py-3"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <Input
            type="number"
            placeholder="Vehicle Capacity"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            required
            halfWidth
            containerClassName="w-1/2"
            className="mb-0 text-sm py-3"
          />
          <select
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-3 w-1/2 text-sm border focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
          >
            <option value="" disabled>Select Vehicle</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" variant="primary" fullWidth size="medium">
        Create Captain Account
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/captainlogin" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  </div>

  {/* Footer */}
  <div className="px-6 py-3 text-[10px] text-gray-500 text-center border-t border-gray-200">
    This site is protected by reCAPTCHA and the
    <span className="underline"> Google Privacy Policy </span> and
    <span className="underline"> Terms of Service apply</span>.
  </div>
</div>


  );
};

export default CaptainSignup;

