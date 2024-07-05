import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import AdminLayout from '../layout/AdminLayout'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/api/userApi'

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isVerified, setIsVerified] = useState('')

  const navigate = useNavigate()
  const params = useParams()

  const { data } = useGetUserDetailsQuery(params?.id)

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name)
      setEmail(data?.user?.email)
      setRole(data?.user?.role)
      setIsVerified(data?.user?.isVerified)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Kullanıcı Güncellendi')
      navigate('/admin/users')
    }
  }, [error, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      role,
      isVerified,
    }

    updateUser({ id: params?.id, body: userData })
  }

  return (
    <AdminLayout>
      <div className='mt-5 min-w-[400px]'>
        <MetaData title={'Kullanıcı Güncelle'} />

        <div className='flex justify-center p-2 my-2 '>
          <form
            className='flex flex-col gap-2 w-full  '
            onSubmit={submitHandler}
          >
            <h2 className='mb-4 text-center font-bold'>Kullanıcı Güncelle</h2>

            <div className='flex flex-col gap-y-2'>
              <label htmlFor='name_field' className='form-label font-semibold'>
                İsim
              </label>
              <input
                type='name'
                id='name_field'
                className='form-control pl-2 rounded border-2 border-gray-300'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label htmlFor='email_field' className='form-label font-semibold'>
                Email
              </label>
              <input
                type='email'
                id='email_field'
                className='form-control pl-2 rounded border-2 border-gray-300'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label htmlFor='role_field' className='form-label font-semibold'>
                Rol
              </label>
              <select
                id='role_field'
                className='form-control pl-2 rounded border-2 border-gray-300'
                name='role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value='user'>user</option>
                <option value='admin'>admin</option>
              </select>
            </div>
            <div className='flex flex-col gap-y-2'>
              <label htmlFor='isVerified' className='form-label font-semibold'>
                Kullanıcı Onay Durumu
              </label>
              <select
                id='isVerified'
                className='form-control pl-2 rounded border-2 border-gray-300'
                name='role'
                value={isVerified}
                onChange={(e) => setIsVerified(e.target.value)}
              >
                <option value='true'>true</option>
                <option value='false'>False</option>
              </select>
            </div>

            <div className='flex justify-center my-2'>
              <button
                type='submit'
                className='btn bg-green-400 hover:bg-green-500 min-w-32 py-2'
                disabled={isLoading}
              >
                {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default UpdateUser
