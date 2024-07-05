import React from 'react'
import UserSideMenu from './UserSideMenu'

const UserLayout = ({ children }) => {
  return (
    <div className='align-page min-h-screen '>
      <div className='mt-2 py-2 md:mb-2'>
        <h2 className='text-center font-bold'>Kullanıcı Ayarları</h2>
      </div>

      <div>
        <div className='grid grid-cols-1 mx-auto md:grid-cols-[1fr,3fr]'>
          <div className='flex justify-center md:justify-start'>
            <UserSideMenu />
          </div>
          <div className=''>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
