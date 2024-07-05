import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../redux/api/userApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import LoginFormInput from '../utilities/LoginFormInput'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const params = useParams()

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation()

  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Parola yenileme başarılı.')
      navigate('/login')
    }
  }, [error, isAuthenticated, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return toast.error('Parolalar Eşleşmiyor. Tekrar Deneyiniz!')
    }

    const data = { password, confirmPassword }

    resetPassword({ token: params?.token, body: data })
  }

  return (
    <main className='align-page'>
      <MetaData title={'Şifre Yenileme'} />
      <div className='bg-gray-100 flex justify-center min-h-screen'>
        <div className='bg-white p-8 rounded shadow-md w-96 h-[400px] mt-20'>
          <form
            className='flex flex-col  p-8 rounded-sm bg-body min-w-72'
            onSubmit={submitHandler}
          >
            <h2 className='mb-4 font-bold text-center'>Yeni Şifre Ekranı</h2>

            <LoginFormInput
              showEye='showEye'
              labelText='Şifre'
              type=''
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              value={password}
            />

            <LoginFormInput
              showEye='showEye'
              labelText=' Şifreyi Onayla'
              type=''
              id='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              name='password'
              value={confirmPassword}
            />

            <button
              id='new_password_button'
              type='submit'
              className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 '
              disabled={isLoading}
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ResetPassword
