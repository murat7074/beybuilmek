import React from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { calculateOrderCost } from '../../helpers/helpers'
import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = () => {
  const { cartItems, shippingInfo, shippingInvoiceInfo } = useSelector(
    (state) => state.cart
  )
  const { user } = useSelector((state) => state.auth)

  const { itemsPrice, shippingPrice, totalPrice } =
    calculateOrderCost(cartItems)


  return (
    <main className='align-page min-h-screen'>
      <MetaData title={'Ödeme Bilgisi'} />
      <CheckoutSteps shipping confirmOrder />
      <div className='flex justify-center '>
        <div className='flex flex-col  mt-5  '>
          {/* address */}
          <div className='flex justify-center items-center gap-x-4 my-4'>
            <div className='flex flex-col'>
              <h4 className='mb-3 font-bold'>Teslimat Adresi</h4>
              <p className='capitalize'>
                <b>İsim:</b> <span className='uppercase'>{shippingInfo?.userName}</span>
              </p>
              <p>
                <b>Telefon:</b> {shippingInfo?.phoneNo}
              </p>
              <p className='max-w-[500px] text-wrap'>
                <b>Adres:</b> {shippingInfo?.address}, {shippingInfo?.city},{' '}
                {shippingInfo?.zipCode}, {shippingInfo?.country}
              </p>
            </div>
            <div className='flex flex-col'>
              <h4 className='mb-3 font-bold'>Fatura Adresi</h4>
              <p className='capitalize'>
                <b>İsim:</b> <span className='uppercase'>{shippingInvoiceInfo?.userName}</span>
              </p>
              <p>
                <b>Telefon:</b> {shippingInvoiceInfo?.phoneNo}
              </p>
              <p className=' max-w-[500px] text-wrap'>
                <b>Adres:</b> {shippingInvoiceInfo?.address},{' '}
                {shippingInvoiceInfo?.city}, {shippingInvoiceInfo?.zipCode},{' '}
                {shippingInvoiceInfo?.country}
              </p>
            </div>
          </div>

          <hr />
          <h4 className='my-2 font-bold'>Sepetinizdeki Ürünler</h4>

          {/* cart items */}
          <div className='flex flex-wrap'>
            {cartItems?.map((item,index) => (
              <div key={index}>
                <hr />

                <div className='flex flex-col gap-y-2 mr-16'>
                  <Link to={`/product/${item.product}`}>
                    <img src={item?.image} alt='image' className='w-20 h-20' />
                  </Link>

                  <div className=''>{item?.name}</div>

                  <div className=''>
                    <p>
                      {item?.amount} x ₺{item?.price} ={' '}
                      <b>₺{(item?.amount * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>

                <hr />
              </div>
            ))}
          </div>

          <hr />
          {/* order summary */}
          <div className='flex flex-col my-4'>
            <div id='order_summary'>
              <h4 className='font-bold'>Sipariş Özeti</h4>
              <hr />
              <p>
                Ara Toplam:{' '}
                <span className='order-summary-values'>₺{itemsPrice} <span className='text-red-500'>(KDV dahil)</span></span>
              </p>
              <p>
                Kargo:{' '}
                <span className='order-summary-values'>₺{shippingPrice}</span>
              </p>
     
              <hr />

              <p>
                Toplam:{' '}
                <span className='order-summary-values'>₺{totalPrice}</span>
              </p>

              <hr />
              <div className='my-2 flex justify-center'>
                <Link
                  to='/payment_method'
                  id='checkout_btn'
                  className=' btn btn-success w-56'
                >
                  Ödeme İçin İlerle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ConfirmOrder
