import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/features/cartSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const StripeSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    toast.success('Sipariş Ödeme Başarılı.')
    dispatch(clearCart())
    navigate('/me/orders')
  }, [])
}

export default StripeSuccess
