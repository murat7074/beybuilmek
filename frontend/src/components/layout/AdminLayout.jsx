import React from 'react'
import AdminSideMenu from './AdminSideMenu'

const AdminLayout = ({ children }) => {
  return (
    <div className='align-page min-h-screen '>
      <div className='mt-2 py-2 md:mb-2'>
        <h2 className='text-center font-bold'>Admin Dashboard</h2>
      </div>

      <div className='flex flex-col md:flex-row'>
        <div className='flex justify-center md:justify-start'>
          <AdminSideMenu />
        </div>

        <div className=' flex mx-auto mt-2 shadow-md'>{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
