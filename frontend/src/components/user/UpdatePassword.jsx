import React, { useEffect, useState } from 'react'
import { useUpdatePasswordMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import UserLayout from '../layout/UserLayout'
import MetaData from '../layout/MetaData'
import LoginFormInput from '../utilities/LoginFormInput'

const UpdatePassword = () => {
  const [changePassword, setNewPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const passwordChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setNewPassword({ ...changePassword, [name]: value })
  }

  const navigate = useNavigate()

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation()

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Şifre Güncellendi')
      setNewPassword({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      navigate('/me/profile')
    }
  }, [error, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    if (
      !changePassword.oldPassword ||
      !changePassword.newPassword ||
      !changePassword.confirmPassword
    ) {
      return toast.error('Girişleri Doldurun')
    }

    if (
      changePassword.oldPassword &&
      changePassword.newPassword === changePassword.confirmPassword
    ) {
      const userData = {
        oldPassword: changePassword.oldPassword,
        password: changePassword.newPassword,
      }

      updatePassword(userData)
    } else {
      toast.error('Onay Şifresi Yeni Şifre ile aynı olmalı.')
    }
  }

  return (
    <UserLayout>
      <MetaData title={'Şifre Güncelle'} />
    <div className='min-h-screen'>
        <div className=' bg-gray-100 flex justify-center max-w-[800px] mt-5 '>
        <div className='bg-white p-8 rounded shadow-md w-96 h-[450px] my-10 '>
          <h2 className='text-2xl font-semibold text-blue-600 text-center mb-4'>
            Şifre Güncelle
          </h2>
          <form className='shadow-sm rounded-sm' onSubmit={submitHandler}>
            <LoginFormInput
              showEye='showEye'
              labelText='Eski Şifre'
              id='oldPassword'
              onChange={passwordChange}
              name='oldPassword'
              value={changePassword.oldPassword}
            />
            <LoginFormInput
              showEye='showEye'
              labelText='Yeni Şifre'
              id='newPassword'
              onChange={passwordChange}
              name='newPassword'
              value={changePassword.newPassword}
            />
            <LoginFormInput
              showEye='showEye'
              labelText='Şifre Onay'
              id='confirmPassword'
              onChange={passwordChange}
              name='confirmPassword'
              value={changePassword.confirmPassword}
            />

            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4'
              disabled={isLoading}
            >
              {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
            </button>
          </form>
        </div>
      </div>
    </div>
    </UserLayout>
  )
}

export default UpdatePassword
