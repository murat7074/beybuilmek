import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profileLinks } from '../../helpers/profileLinks'

const UserSideMenu = () => {
  return (
    <ul className='flex mx-2 gap-x-2 text-xs md:text-base md:flex-col '>
      {profileLinks.map((link) => {
        const { id, text, url, Icon } = link

        return (
          <li key={id} className=' tracking-wide text-center text-wrap'>
            <NavLink
              className=' flex flex-col gap-x-1 md:flex-row justify-start items-center md:gap-x-2 md: my-1  aria-[current=page]:text-orange-500 aria-[current=page]:font-bold hover:text-orange-300 capitalize'
              to={url}
            >
              <Icon /> <span>{text}</span>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

export default UserSideMenu
