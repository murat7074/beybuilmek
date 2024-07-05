import React, { useEffect, useState } from 'react'
import { useGetMeQuery } from '../../redux/api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Search from './Search'
import { useLazyLogoutQuery } from '../../redux/api/authApi'
import { links } from '../../helpers/links'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { toggleTheme } from '../../redux/features/userSlice'
import UserDropdownMenu from '../utilities/UserDropdownMenu'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  UserDropdownMenu

  const [isCheckout, setIsCheckout] = useState(false)

  const { isLoading,data } = useGetMeQuery()

  const [logout, { isSuccess }] = useLazyLogoutQuery()

  // console.log("me",data && data);

  const handleTheme = () => {
    dispatch(toggleTheme())
  }

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  const logoutHandler = () => {
    logout()
  }

  const { user, theme } = useSelector((state) => state.auth)
  const { cartItems, shippingInfo, shippingInvoiceInfo } = useSelector(
    (state) => state.cart
  )

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0
  }

  useEffect(() => {
    if (
      user &&
      cartItems.length >= 1 &&
      !isEmptyObject(shippingInfo) &&
      !isEmptyObject(shippingInvoiceInfo)
    ) {
      setIsCheckout(true)
    } else {
      setIsCheckout(false)
    }
  }, [cartItems, shippingInfo, shippingInvoiceInfo, user])

  return (
    <div className='align-page flex flex-col '>
      <nav className='bg-gray-50 py-2 lg:py-4 lg:px-2 mt-1 shadow-sm'>
        <div className='flex justify-between items-center w-full p-1 gap-x-1'>
          {/* Logo ve Link */}

          <div className='w-24 h-10 rounded-lg shadow '>
            <Link to='/'>
              <img src='/images/logo_beybuilmek.jpg' alt='ShopIT Logo' />
            </Link>
          </div>

          <div className='text-center hidden lg:flex justify-center items-center flex-1 '>
            <ul className='flex gap-x-1 lg:gap-x-4 items-center'>
              {links.map((link) => {
                if (!isCheckout && link.url === '/checkout') return null
                const { id, text, url } = link

                return (
                  <li key={id} className=' tracking-wide'>
                    <NavLink
                      className='text-black aria-[current=page]:text-blue-400 hover:text-blue-300 capitalize'
                      to={url}
                    >
                      {text}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className='hidden lg:block mr-5 lg:mr-7'>
            <label className='swap swap-rotate'>
              <input type='checkbox' onChange={handleTheme} />
              {/* sun icon*/}
              <BsSunFill className='swap-on h-4 w-4 text-blue-400' />
              {/* moon icon*/}
              <BsMoonFill className='swap-off h-4 w-4 text-blue-400' />
            </label>
          </div>

          {/* Arama çubuğu ve kart/kullanıcı alanı */}
          <div className='flex justify-end items-center gap-x-4 w-full md:w-auto'>
            {/* Arama çubuğu */}
            <Search />

            {/* Kart ve kullanıcı bölgesi */}
            <div className='flex items-center gap-x-4'>
              {/* Kart linki */}

              <Link
                to='/cart'
                className='flex items-center text-orange-500 hover:text-orange-700'
              >
                <div className='dropdown'>
                  <div
                    tabIndex='0'
                    role='button'
                    className='btn btn-ghost btn-circle'
                  >
                    <div className='indicator'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-8 w-8'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 100-4zm-8 2a2 2 0 100 4 2 2 0 100-4z'
                        />
                      </svg>
                      <span className='badge badge-sm indicator-item'>
                        {cartItems?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Kullanıcı ya da Giriş butonu */}
              <div>
                {user ? (
                  <UserDropdownMenu user={user} logoutHandler={logoutHandler} />
                ) : (
                  !isLoading && (
                    <Link
                      to='/login'
                      className='btn bg-color-[#fa9c23] w-14'
                      id='login_btn'
                    >
                      Giriş Yap
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Küçük ekranlar için menü */}
      <div className='bg-gray-100 flex justify-center items-center  mt-2 lg:hidden gap-x-10 py-1 '>
        <div className='text-center flex justify-center items-center '>
          <ul className='flex p-1 gap-x-2 md:gap-x-4 items-center'>
            {links.map((link) => {
              if (!isCheckout && link.url === '/checkout') return null
              const { id, text, url } = link

              return (
                <li key={id} className=' tracking-wide'>
                  <NavLink
                    className='text-black aria-[current=page]:text-blue-500 hover:text-blue-700 capitalize'
                    to={url}
                  >
                    {text}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>

        <div className=''>
          <label className='swap swap-rotate'>
            <input type='checkbox' onChange={handleTheme} />
            {/* sun icon*/}
            <BsSunFill className='swap-on h-4 w-4 text-blue-400' />
            {/* moon icon*/}
            <BsMoonFill className='swap-off h-4 w-4 text-blue-400' />
          </label>
        </div>
      </div>
    </div>
  )
}

export default Header
