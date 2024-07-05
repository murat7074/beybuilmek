
import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import LoginFormInput from '../utilities/LoginFormInput';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [login, { isLoading, error, data }] = useLoginMutation();

 

  const { isAuthenticated } = useSelector((state) => state.auth);

  // console.log("login data", data && data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      toast.error(error?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  }, [error, isAuthenticated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    // Debugging: Log the login data
    // console.log('Submitting login data:', loginData);

    // Make sure to handle JSON serialization if needed
    login(loginData).unwrap().catch((err) => {
      // Additional catch block to handle potential errors not caught in useEffect
      console.error('Error during login:', err);
      toast.error('Bilinmeyen Hata. Lütfen tekrar deneyin.');
    });


  };

  return (
    <main className='align-page'>
      <MetaData title={'Giriş'} />
      <div className='min-h-screen bg-gray-100 flex justify-center'>
        <div className='bg-white p-8 rounded shadow-md w-96 h-[400px] mt-20'>
          <h2 className='text-2xl font-semibold text-blue-600 text-center mb-4'>
            Giriş
          </h2>
          <form className='shadow-sm rounded-sm' onSubmit={submitHandler}>
            <LoginFormInput
              labelText='Email'
              type='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              value={email}
            />

            <LoginFormInput
              showEye='showEye'
              labelText='Şifre'
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              value={password}
            />

            <Link
              to='/password/forgot'
              className='text-green-600 hover:text-green-800 capitalize hover:underline'
            >
              Şifrenimi unuttun?
            </Link>

            <button
              id='login_button'
              type='submit'
              className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4'
              disabled={isLoading}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş'}
            </button>

            <div className='flex justify-end m-2 '>
              <Link to='/register' className='text-blue-600 hover:text-blue-800 hover:underline'>
                Yeni Kullanıcı?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;










