import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Link, useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import AdminLayout from '../layout/AdminLayout'
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from '../../redux/api/orderApi'

import { IoPrintSharp } from 'react-icons/io5'

const ProcessOrder = () => {
  const [status, setStatus] = useState('')

  const [shippedMessage, setShippedMessage] = useState({
    message: '',
    firm: '',
  })

  const params = useParams()
  const { data } = useOrderDetailsQuery(params?.id)
  const order = data?.order || {}

  const [updateOrder, { error, isSuccess, isLoading }] =
    useUpdateOrderMutation()

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order

  const isPaid = paymentInfo?.status === 'paid' ? true : false

  const inputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setShippedMessage({ ...shippedMessage, [name]: value })
  }

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus)
    }
  }, [orderStatus])

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Sipariş Durumu Güncellendi.')
    }
  }, [error, isSuccess])

  const updateOrderHandler = (id) => {
    const newData = { status }

    if (newData.status === 'Shipped') {
      if (!shippedMessage.message || !shippedMessage.firm) {
        toast.error('Kargoda Durumu Seçildiğinde Kargo Bilgileri Girilmelidir.')
      } else {
        const shippedNo = shippedMessage.message
        const shippedFirm = shippedMessage.firm
        const body = { ...newData, shippedNo, shippedFirm }

        updateOrder({ id, body })

        setShippedMessage({ message: '', firm: '' })
      }
    } else {
      updateOrder({ id, body: newData })
    }
  }

  return (
    <AdminLayout>
      <MetaData title={'Sipariş Durumu'} />
      <div className='flex min-w-[450px] md:min-w-[600px] lg:min-w-[800px]'>
        <div className='flex flex-col w-full'>
          <div className='flex flex-col'>
            <h3 className='mt-5 mb-4 italic font-semibold text-center'>
              Sipariş Detayı
            </h3>

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
              </tbody>
            </table>

            <h3 className='mt-5 mb-4 italic font-semibold text-center'>
              Teslimat Bilgisi
            </h3>
            <table className='table '>
              <tbody>
                <tr>
                  <th scope='row'>İsim ve Soyisim</th>
                  <td>{shippingInfo?.userName}</td>
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
                  <th scope='row'>Toplam Ödeme</th>
                  <td>₺{totalAmount}</td>
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

          <h3 className='mt-5 italic font-semibold text-center'>
            Ürün Durumunu Güncelleme:
          </h3>
          <div className='flex flex-col justify-between md:flex-row mx-4'>
            <div className='flex flex-col my-5 '>
              <div className='flex justify-center gap-x-4 items-center mb-3'>
                <h4 className='font-bold'>Durum</h4>
                <select
                  className='form-select border-2 border-gray-300 min-w-40 rounded-md pl-2 py-2'
                  name='status'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value='Processing'>Hazırlanıyor</option>
                  <option value='Shipped'>Kargoda</option>
                  <option value='Delivered'>Teslim Edildi</option>
                  <option value='Returned'>İade Edildi</option>
                  <option value='Return-Processing'>İade Sürecinde</option>
                </select>
              </div>

              <div className='flex flex-col justify-center items-center gap-y-4'>
                <button
                  className='btn btn-primary w-60'
                  disabled={isLoading}
                  onClick={() => updateOrderHandler(order?._id)}
                >
                  Durumu Güncelle
                </button>

                <Link
                  to={`/invoice/order/${order?._id}`}
                  className='btn btn-success w-60'
                >
                  <IoPrintSharp style={{ height: '20px', width: '20px' }} />{' '}
                  Fatura Oluştur
                </Link>
              </div>
            </div>

            <form className='flex flex-col justify-center items-center rounded bg-white p-2 mx-4'>
              <h2 className='font-bold mb-4 text-red-500 italic'>
                Durum "KARGODA" Seçildiğinde Giriş Yapınız.
              </h2>

              <div className='flex flex-col mb-3 px-4'>
                <label
                  htmlFor='address_field'
                  className='block text-sm font-bold  mb-1'
                >
                  Firma Adı Giriniz
                </label>
                <input
                  type='text'
                  id='address_field'
                  className='w-60 p-2 border border-gray-300 rounded'
                  name='firm'
                  value={shippedMessage?.firm}
                  onChange={inputChange}
                  required
                />
              </div>

              <div className='flex flex-col mb-3 px-4'>
                <label htmlFor='description_field' className='font-bold mb-1'>
                  Kargo Takip Numarası Giriniz
                </label>
                <textarea
                  className='form-control border-2 border-gray-300 rounded-sm  h-10 pl-2 w-60'
                  id='description_field'
                  rows='8'
                  name='message'
                  value={shippedMessage?.message}
                  onChange={inputChange}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProcessOrder
