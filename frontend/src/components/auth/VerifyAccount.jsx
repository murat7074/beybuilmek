import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useVerifyMutation } from '../../redux/api/authApi'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const VerifyAccount = () => {
  const navigate = useNavigate()

  const query = useQuery()

  const verificationToken = query.get('verificationToken')
  const email = query.get('email')

  const [verify, { error, isSuccess, data, isLoading }] = useVerifyMutation()

  useEffect(() => {
    if (verificationToken && email) {
      const verifyData = {
        email,
        verificationToken,
      }

      verify(verifyData)
    }
  }, [verificationToken, email])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Hesabınız Onaylandı Lütfen Giriş Yapın')
      navigate('/login')
    }
    if (error) {
      toast.error(error?.data?.message)
    }
  }, [error, isSuccess])

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className=' flex justify-center items-center min-h-screen mx-auto max-w-7xl px-8 '>
      <h2 className='text-green-600 text-2xl'>Lüyfen Bekleyin...</h2>
    </main>
  )
}

export default VerifyAccount
