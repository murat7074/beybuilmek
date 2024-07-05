import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className='align-page min-h-screen'>
      {' '}
      <div className='mt-5'>
        <h5 className='text-center'>
          Sayfa Bulunamdı. Git{' '}
          <Link to='/' className='underline text-red-500'>
            Ana Sayfa
          </Link>
        </h5>
      </div>
      <div className='flex justify-center'>
        <div className=''>
          <img
            src='/images/404.svg'
            height='550'
            width='550'
            alt='404_not_found'
          />
        </div>
      </div>
    </main>
  )
}

export default NotFound
