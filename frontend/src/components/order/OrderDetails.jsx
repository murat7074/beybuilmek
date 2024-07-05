import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../layout/Loader'
import { toast } from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import { useOrderDetailsQuery } from '../../redux/api/orderApi'
import { FiPrinter } from 'react-icons/fi'
import { IoMdArrowBack } from 'react-icons/io'

const OrderDetails = () => {
  const params = useParams()
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id)
  const order = data?.order || {}

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order

  const isPaid = paymentInfo?.status === 'paid' ? true : false

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
  }, [error])

  if (isLoading) return <Loader />

  return (
    <main className='align-page min-h-screen  '>
      <MetaData title={'Sipariş Detay'} />
      <div className='flex justify-center'>
        <div className='flex flex-col mt-5 '>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mt-5 mb-4 text-center font-bold'>
              Sipariş Özetiniz
            </h3>
            <div className='flex justify-between '>
              <div className='mr-20'>
                <Link
                  className='btn btn-success'
                  to={`/invoice/order/${order?._id}`}
                >
                  <FiPrinter style={{ width: '25px', height: '25px' }} /> Fatura
                </Link>
              </div>

              <div className='mr-20'>
                <Link
                  to='/me/orders'
                  className='btn btn-ghost border-md border-gray-200 text-xs'
                >
                  <IoMdArrowBack style={{ width: '25px', height: '25px' }} />
                  Siparişlerime Dön
                </Link>
              </div>
            </div>
          </div>

          <h3 className='mt-5 my-4 font-bold italic'>Ürünler:</h3>

          <div className='flex flex-wrap items-center gap-x-10 gap-y-3 mb-2 '>
            {orderItems?.map((item, index) => (
              <div key={index} className='flex gap-x-2 '>
                <div className=''>
                  <Link to={`/product/${item?.product}`}>
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className='w-36 h-36 object-cover'
                    />
                  </Link>
                </div>
                <div className='flex flex-col max-w-96'>
                  <div className='col-5 col-lg-5'>
                    <p>{item?.name}</p>
                  </div>
                  <div className=''>
                    <p>
                      Birim Fiyatı : ₺{Number(item?.price).toFixed(2)}{' '}
                      <span className='text-red-500'>(KDV hariç)</span>
                    </p>
                  </div>

                  <div className=''>
                    <p>{item?.amount} Adet</p>
                  </div>
                  <div className=''>
                    <p>
                      Toplam: ₺{Number(item?.amount * item?.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <table className='table table-striped table-bordered'>
            <tbody>
              <tr>
                <th scope='row'>Sipari Numarası</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope='row'>Durum</th>
                <td
                  className={
                    String(orderStatus).includes('Delivered')
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  <b>
                    {orderStatus === 'Processing'
                      ? 'Hazırlanıyor'
                      : orderStatus === 'Shipped'
                      ? 'Kargoda'
                      : orderStatus === 'Delivered'
                      ? 'Teslim Edildi'
                      : orderStatus === 'Returned'
                      ? 'İade Edildi'
                      : orderStatus === 'Return-Processing'
                      ? 'İade Sürecinde'
                      : orderStatus === 'Deleted'
                      ? 'İptal Edildi'
                      : ''}
                  </b>
                </td>
              </tr>
              <tr>
                <th scope='row'>Sipariş Tarihi</th>
                <td>{new Date(order?.createdAt).toLocaleString('en-GB')}</td>
              </tr>
            </tbody>
          </table>
          <hr />

          <h3 className='mt-5 mb-4 font-bold italic'>Kargo Bilgileri</h3>
          <table className='table table-striped table-bordered'>
            <tbody>
              <tr>
                <th scope='row'>İsim ve Soyisim</th>
                <td className='uppercase'>{shippingInfo.userName}</td>
              </tr>
              <tr>
                <th scope='row'>Telefon No</th>
                <td>{shippingInfo?.phoneNo}</td>
              </tr>
              <tr>
                <th scope='row'>Adres</th>
                <td>
                  {shippingInfo?.address}, {shippingInfo?.city},{' '}
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />

          <h3 className='mt-5 mb-4 font-bold italic'>Ödeme Bilgileri</h3>
          <table className='table table-striped table-bordered mb-5'>
            <tbody>
              <tr>
                <th scope='row'>Durum</th>
                <td className={isPaid ? 'greenColor' : 'redColor'}>
                  <b>
                    {' '}
                    {paymentInfo?.status === 'paid'
                      ? 'Ödendi'
                      : paymentInfo?.status === 'Not Paid'
                      ? 'Kapıda Ödeme'
                      : ''}
                  </b>
                </td>
              </tr>
              <tr>
                <th scope='row'>Ödeme Metodu</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope='row'>Stripe ID</th>
                <td>{paymentInfo?.id || 'Nill'}</td>
              </tr>
              <tr>
                <th scope='row'>Ödeme Miktarı</th>
                <td>₺{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default OrderDetails
