import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../redux/api/userApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import LoginFormInput from '../utilities/LoginFormInput'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation()

  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Email gönderildi. Lütfen posta kutunuzu kontrol ediniz.')
    }
  }, [error, isAuthenticated, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    forgotPassword({ email })
    setEmail("")
  }

  return (
    <main className='align-page '>
      <MetaData title={' Şifremi Unuttum'} />
      <div className='bg-gray-100 flex justify-center min-h-screen'>
        <div className='bg-white p-8 rounded shadow-md w-96 h-[300px] mt-20'>
          <h2 className='text-2xl font-semibold text-blue-600 text-center mb-4'>
            Şifremi Unuttum
          </h2>
          <form className='shadow-sm rounded-sm' onSubmit={submitHandler}>
            <div className='mt-3'>
              <LoginFormInput
                labelText='Email'
                type='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                value={email}
              />
            </div>

            <button
              id='forgot_password_button'
              type='submit'
              className='btn btn-primary w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Gönderiyor...' : ' Email Gönder'}
            </button>
            <div className='flex items-center justify-center mt-2 gap-x-2 '>
              <h2 className='capitalize'>Şifrenimi unuttun?</h2>
              <Link
                to='/login'
                className='flex ml-1 capitalize cursor-pointer text-blue-400 font-bold hover:text-blue-600 hover:underline'
              >
               Giriş Yap
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword
