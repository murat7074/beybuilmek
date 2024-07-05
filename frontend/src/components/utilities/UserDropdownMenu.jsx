import React from 'react'
import { Link } from 'react-router-dom'

import { IoIosArrowDown } from 'react-icons/io'

const UserDropdownMenu = ({ user, logoutHandler }) => {
  // CLOSE DROPDOWN MENU
  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }
  }

  return (
    <div className='dropdown dropdown-bottom'>
      <div
        tabIndex={0}
        role='button'
        className='relative flex btn m-1 bg-gray-100 hover:bg-gray-200'
      >
        <div className='flex items-center gap-x-2 '>
          <figure className='w-8 h-8'>
            <img
              src={
                user?.avatar ? user?.avatar?.url : '/images/default_avatar.jpg'
              }
              alt='User Avatar'
              className='rounded-full object-cover'
            />
          </figure>
          <div className='flex flex-col pr-1'>
            <span className='text-gray-700'>Hesabım</span>

            <span className='font-semibold capitalize text-gray-700'>
              {user?.name}
            </span>
          </div>
        </div>

        <div className='absolute right-0 top-4'>
          <IoIosArrowDown />
        </div>
      </div>

      <ul
        tabIndex={0}
        className=' absolute  right-4 dropdown-content z-[1] w-20 md:w-28 menu flex items-center gap-y-1 shadow bg-base-100 rounded-box '
        onClick={closeDropdown}
      >
        {user?.role === 'admin' && (
          <Link className='hover:scale-105' to='/admin/dashboard'>
            Dashboard
          </Link>
        )}

        <Link className=' hover:scale-105' to='/me/orders'>
          Siparişler
        </Link>

        <Link className='hover:scale-105' to='/me/profile'>
          Profil
        </Link>
        <Link className='hover:scale-105' to='/me/messages'>
          Mesaj
        </Link>

        <Link
          className='text-red-400 hover:scale-105'
          to='/'
          onClick={logoutHandler}
        >
          Çıkış
        </Link>
      </ul>
    </div>
  )
}

export default UserDropdownMenu
