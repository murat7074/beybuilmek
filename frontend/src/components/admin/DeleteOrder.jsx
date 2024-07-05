import React, { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'

import { Link, useNavigate, useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import AdminLayout from '../layout/AdminLayout'
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
} from '../../redux/api/orderApi'

const DeleteOrder = () => {
  const navigate = useNavigate() //
  const params = useParams()

  const [retMessage, setRetMessage] = useState({
    title: '',
    message: '',
  }) //

  const { data } = useOrderDetailsQuery(params?.id)
  const order = data?.order || {}

  const [deleteOrder, { error, isLoading: isDeleteLoading, isSuccess }] =
    useDeleteOrderMutation()

  const deleteOrderHandler = (e, id) => {
    e.preventDefault()

    const { title, message } = retMessage

    if (message && title) {
      const body = {
        message,
        title,
      }

    
      deleteOrder({ id, body })
    } else {
     
      toast.error('Eksik bilgi: Lütfen tüm alanları doldurun.')
    }
  }

  const inputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setRetMessage({ ...retMessage, [name]: value })
  }

  const {
    orderItems,
    paymentInfo,
    taxAmount,
    user,
    totalAmount,
    shippingAmount,
    orderStatus,
  } = order

  const isPaid = paymentInfo?.status === 'paid' ? true : false

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Sipariş Silindi')
      setRetMessage({ title: '', message: '' })
      navigate('/admin/messages')
    }
  }, [error, isSuccess])

  return (
    <AdminLayout>
      <MetaData title={'Sipariş Sil'} />
      <div className='flex min-w-[450px] md:min-w-[600px] lg:min-w-[800px]'>
        <div className='flex flex-col w-full'>
          <h2 className='mt-5 mb-4 italic font-bold text-lg text-center tracking-widest'>
            Sipariş İptal Etme
          </h2>
          <div className='flex flex-col'>
            <table className='table '>
              <tbody>
                <tr>
                  <th scope='row'>ID</th>
                  <td>{order?._id}</td>
                </tr>
                <tr>
                  <th scope='row'>Sipariş Durumu</th>
                  <td
                    className={`${
                      String(orderStatus).includes('Delivered')
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    <b>      {orderStatus === 'Processing'
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
                      : ''}</b>
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className='mt-5 mb-4 italic font-semibold text-center'>
              Ödeme Bilgisi
            </h3>
            <table className='table '>
              <tbody>
                <tr>
                  <th scope='row'>Ödeme Durumu</th>
                  <td
                    className={`${isPaid ? 'text-green-500' : 'text-red-500'}`}
                  >
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
                  <th scope='row'>Ödeme Şekli</th>
                  <td>{order?.paymentMethod}</td>
                </tr>
                <tr>
                  <th scope='row'>Stripe ID</th>
                  <td>{paymentInfo?.id || 'Nill'}</td>
                </tr>
                <tr>
                  <th scope='row'>Kargo</th>
                  <td className='leading-4'>₺{shippingAmount}</td>
                </tr>
                <tr>
                  <th scope='row'>Vergi</th>
                  <td className='leading-4'>₺{taxAmount}</td>
                </tr>
                <tr>
                  <th scope='row'>Toplam Ödeme</th>
                  <td className='font-bold leading-4'>₺{totalAmount}</td>
                </tr>
              </tbody>
            </table>

            <h3 className='mt-5 my-4 italic font-semibold text-center'>
              Sipariş Ürünleri:
            </h3>

            <hr />
            <div className='flex flex-wrap m-2 gap-x-8 gap-y-2'>
              {orderItems?.map((item, index) => (
                <div key={index} className='flex items-center gap-x-4'>
                  <Link to={`/products/${item?.product}`} className=''>
                    <img
                      className='rounded-sm w-20 h-20 object-cover'
                      src={item?.image}
                      alt={item?.name}
                    />
                  </Link>

                  <div className='flex flex-col'>
                    <div className=''>
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
          </div>

          <div className='flex flex-col w-[450px] md:w-[600px] lg:w-[800px]  mx-auto mt-5'>
            <div className='flex  justify-center items-center '>
              <div className='flex flex-col gap-y-5 items-center'>
                <h2>
                  <span className='font-bold'>İptal Edilecek Sipariş No:</span>{' '}
                  {order?._id}
                </h2>
              </div>
            </div>

            <div className=''>
              <form className=' rounded bg-white p-2 mx-4'>
                <h2 className='text-2xl font-bold mb-4 text-center italic'>
                  Sipariş İptali Cevap Formu
                </h2>

                <div className='flex flex-col mb-3 px-4'>
                  <label
                    htmlFor='address_field'
                    className='block text-sm font-bold  mb-1'
                  >
                    Konu
                  </label>
                  <input
                    type='text'
                    id='address_field'
                    className='w-full p-2 border border-gray-300 rounded'
                    name='title'
                    value={retMessage?.title}
                    onChange={inputChange}
                    required
                  />
                </div>

                <div className='flex flex-col mb-3 px-4'>
                  <label htmlFor='description_field' className='font-bold '>
                    İptal mesajını yazınız
                  </label>
                  <textarea
                    className='form-control border-2 border-gray-300 rounded-sm min-w-96 pl-2'
                    id='description_field'
                    rows='8'
                    name='message'
                    value={retMessage?.message}
                    onChange={inputChange}
                  ></textarea>
                </div>

                <div className='flex justify-center my-4'>
                  <button
                    id='shipping_btn'
                    type='submit'
                    className='btn w-96 py-2 bg-red-500 text-white rounded hover:bg-red-700'
                    onClick={(e) => deleteOrderHandler(e, order?._id)}
                    disabled={isDeleteLoading}
                  >
                    Sil
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default DeleteOrder
