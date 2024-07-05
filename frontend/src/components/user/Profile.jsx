import React from 'react'
import UserLayout from '../layout/UserLayout'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <UserLayout>
      <MetaData title={'Profiliniz'} />
      <div className=' flex justify-center mt-5 max-w-[800px] '>
        <div className='flex flex-col items-center  gap-y-2 '>
          <figure className='flex -space-x-1 overflow-hidden'>
            <img
              className='inline-block h-52 w-52 xl:h-72 xl:w-72 rounded-full ring-2 ring-white '
              src={
                user?.avatar ? user?.avatar?.url : '/images/default_avatar.jpg'
              }
              alt={user?.name}
            />
          </figure>

          <div className='flex flex-col gap-y-1 mt-2 '>
            <div className='flex gap-x-2'>
              <h4> İsim:</h4>
              <p className='font-semibold '>{user?.name}</p>
            </div>

            <div className='flex gap-x-2'>
              <h4>Email:</h4>
              <p className='font-semibold '>{user?.email}</p>
            </div>
            <div className='flex gap-x-2'>
              <h4>Üye Tarihi:</h4>
              <p className='font-semibold '>
                {new Date(user?.createdAt).toLocaleDateString('tr-TR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default Profile
