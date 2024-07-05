import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import LoginFormInput from '../utilities/LoginFormInput'



const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = user

  const navigate = useNavigate()

  const [register, { isLoading, error, data, isSuccess }] =
    useRegisterMutation()

  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
    if (error) {
      
      toast.error("Email Kullanımda. Farklı bir email giriniz")
    }
    if (isSuccess) {
      toast.success(data.message)
      setUser({
        name: '',
        email: '',
        password: '',
      })
    }
  }, [error, isAuthenticated, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    const signUpData = {
      name,
      email,
      password,
    }

    register(signUpData)
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <main className='align-page'>
      <MetaData title={'Register'} />
      <div className='min-h-screen bg-gray-100 flex justify-center'>
        <div className='bg-white p-8 rounded shadow-md w-96 h-[450px] mt-20'>
          <h2 className='text-2xl font-semibold text-blue-600 text-center mb-4'>
            Kayıt
          </h2>
          <form className='shadow-sm rounded-sm' onSubmit={submitHandler}>
            <LoginFormInput
              labelText='İsim'
              type='text'
              id='name'
              onChange={onChange}
              name='name'
              value={name}
            />

            <LoginFormInput
              labelText='Email'
              type='email'
              id='email'
              onChange={onChange}
              name='email'
              value={email}
            />
            <LoginFormInput
              showEye='showEye'
              labelText='Şifre'
              type=''
              id='password'
              onChange={onChange}
              name='password'
              value={password}
            />

            <div className='flex justify-center'>
              <Link
                to='/login'
                type='button'
                className=' text-blue-600 hover:text-blue-800 hover:underline'
              >
                Hesabım var / Giriş
              </Link>
            </div>

            <button
              id='register_button'
              type='submit'
              className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4'
              disabled={isLoading}
            >
              {isLoading ? 'Oluşturuluyor..' : 'KAYIT'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Register
