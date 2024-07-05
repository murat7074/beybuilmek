import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()

  const [isCheckout, setIsCheckout] = useState(false)

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

  useEffect(() => {
    if (isCheckout) {
      navigate('/confirm_order')
    }
  }, [isCheckout])

  return <div></div>
}

export default Checkout
