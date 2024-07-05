import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateProfileMutation } from '../../redux/api/userApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import UserLayout from '../layout/UserLayout'
import MetaData from '../layout/MetaData'
import LoginFormInput from '../utilities/LoginFormInput'


const UpdateProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setName(user?.name)
      setEmail(user?.email)
    }

    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Profil Güncellendi.')
      navigate('/me/profile')
    }
  }, [user, error, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
    }

    updateProfile(userData)
  }

  return (
    <UserLayout>
      <MetaData title={'Profil Güncelle'} />

       <div className='min-h-screen'>
      <div className='bg-gray-100 flex justify-center max-w-[800px] mt-5 '>
        <div className='bg-white p-8 rounded shadow-md w-96 h-[350px] my-10'>
          <h2 className='text-2xl font-semibold text-blue-600 text-center mb-4'>
            Update Profile
          </h2>
          <form className='shadow-sm rounded-sm' onSubmit={submitHandler}>
            <LoginFormInput
              labelText='İsim'
              type='text'
              id='name'
              onChange={(e) => setName(e.target.value)}
              name='name'
              value={name}
            />

            <LoginFormInput
              labelText='Email'
              type='email'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              value={email}
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

export default UpdateProfile
