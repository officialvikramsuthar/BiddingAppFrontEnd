import React, { useState } from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const isValidEmail = (email:any) => {
    var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
  }

  const handleSendOtp = async () => {
    let body = {}

    if(isValidEmail(emailOrPhone)){
        body = {email : emailOrPhone}
    }else{
        body = {mobile : emailOrPhone}
    } 

    const response = await fetch(`${config.apiBaseUrl}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...body,  otp}),
      });
      const data = await response.json();
      
      if (data.access) {
        setAuthenticated(true);
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        navigate('/items');
      } else {
        alert('Invalid OTP');
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        {!authenticated ? (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailOrPhone">
                Email or Phone
              </label>
              <input
                type="text"
                id="emailOrPhone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login 
            </button>
          </form>
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-700 text-sm font-bold">Authenticated!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
