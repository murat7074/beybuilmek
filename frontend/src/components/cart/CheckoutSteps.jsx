import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  const { theme } = useSelector((state) => state.auth)

  const setDraculaTheme = theme && theme === 'dracula'

  return (
    <div className='flex justify-center mt-5'>
      {shipping ? (
        <Link to='/shipping' className='flex items-center'>
          <div
            className={`w-0 h-0 border-t-[16px] border-t-orange-500 border-l-[15px] ${
              setDraculaTheme ? 'border-l-gray-800' : 'border-l-white'
            } border-b-[16px] border-b-orange-500 mr-[-1px]`}
          ></div>
          <div className='bg-orange-500 text-white py-1 px-3 font-bold'>
            Kargo
          </div>
          <div className='w-0 h-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-orange-500 border-b-[20px] border-b-transparent ml-[-1px]'></div>
        </Link>
      ) : (
        <Link to='#!' className='flex items-center pointer-events-none'>
          <div
            className={`w-0 h-0 border-t-[16px] border-t-gray-300 border-l-[15px] ${
              setDraculaTheme ? 'border-l-gray-800' : 'border-l-white'
            } border-b-[16px] border-b-gray-300 mr-[-1px]`}
          ></div>
          <div className='bg-gray-300 text-gray-500 py-1 px-3 font-bold'>
               Kargo
          </div>
          <div className='w-0 h-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-gray-300 border-b-[20px] border-b-transparent ml-[-1px]'></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to='/confirm_order' className='flex items-center'>
          <div
            className={`w-0 h-0 border-t-[16px] border-t-orange-500 border-l-[15px] ${
              setDraculaTheme ? 'border-l-gray-800' : 'border-l-white'
            } border-b-[16px] border-b-orange-500 mr-[-1px]`}
          ></div>
          <div className='bg-orange-500 text-white py-1 px-3 font-bold'>
           Sipariş Onayı
          </div>
          <div className='w-0 h-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-orange-500 border-b-[20px] border-b-transparent ml-[-1px]'></div>
        </Link>
      ) : (
        <Link to='#!' className='flex items-center pointer-events-none'>
          <div
            className={`w-0 h-0 border-t-[16px] border-t-gray-300 border-l-[15px] ${
              setDraculaTheme ? 'border-l-gray-800' : 'border-l-white'
            } border-b-[16px] border-b-gray-300 mr-[-1px]`}
          ></div>
          <div className='bg-gray-300 text-gray-500 py-1 px-3 font-bold'>
              Sipariş Onayı
          </div>
          <div className='w-0 h-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-gray-300 border-b-[20px] border-b-transparent ml-[-1px]'></div>
        </Link>
      )}

      {payment ? (
        <Link to='/payment_method' className='flex items-center'>
          <div
            className={`w-0 h-0 border-t-[16px] border-t-orange-500 border-l-[15px] ${
              setDraculaTheme ? 'border-l-gray-800' : 'border-l-white'
            } border-b-[16px] border-b-orange-500 mr-[-1px]`}
          ></div>
          <div className='bg-orange-500 text-white py-1 px-3 font-bold'>
           Ödeme
          </div>
          <div className='w-0 h-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-orange-500 border-b-[20px] border-b-transparent ml-[-1px]'></div>
        </Link>
      ) : (
        <Link to='#!' className='flex items-center pointer-events-none'>
          <div
            className={`w-0 h-0 border-t-[16px] border-t-gray-300 border-l-[15px] ${
              setDraculaTheme ? 'border-l-gray-800' : 'border-l-white'
            } border-b-[16px] border-b-gray-300 mr-[-1px]`}
          ></div>
          <div className='bg-gray-300 text-gray-500 py-1 px-3 font-bold'>
            Ödeme
          </div>
          <div className='w-0 h-0 border-t-[20px] border-t-transparent border-l-[15px] border-l-gray-300 border-b-[20px] border-b-transparent ml-[-1px]'></div>
        </Link>
      )}
    </div>
  )
}

export default CheckoutSteps
