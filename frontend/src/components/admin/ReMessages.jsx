import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useOrderDetailsQuery } from '../../redux/api/orderApi'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import AdminLayout from '../layout/AdminLayout'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { useReMessageAdminMutation } from '../../redux/api/userApi'

const ReMessages = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { userID, messageID } = useSelector(
    (state) => state.auth.returnAdminMsgIDs
  )


  const [retMessage, setRetMessage] = useState({
    title: '',
    message: '',
  })

  const { data, isLoading, error } = useOrderDetailsQuery(params?.id)

  const [
    reMessageAdmin,
    { data: reqData, isLoading: reqIsLoading, error: reqError, isSuccess },
  ] = useReMessageAdminMutation()



  const order = data?.order || {}

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
    _id: orderID,
  } = order

  const submitHandler = (e) => {
    e.preventDefault()

    const { title, message } = retMessage

    if (message && title) {
      const body = {
        message,
        title,
        userID,
        messageID,
      }

      reMessageAdmin({ id: orderID, body })
    } else {
      // Eksik bilgi olduğunda yapılacak işlemler buraya yazılabilir
      toast.error('Eksik bilgi: Lütfen tüm alanları doldurun.')
    }
  }

  const inputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setRetMessage({ ...retMessage, [name]: value })
  }



  useEffect(() => {
    if (error || reqError) {
      toast.error(error?.data?.message)
      toast.error(reqError?.data?.message)
    }
    if (isSuccess) {
      toast.success('İade mesajına cevap gönderildi.')

      setRetMessage({ title: '', message: '' })
      navigate('/admin/messages')
    }
  }, [error, reqError, isSuccess, reqData])

  if (isLoading) return <Loader />

  return (
    <AdminLayout>
      <div className='align-page min-h-screen '>
        <MetaData title={'Mesaj Yaz'} />
        <div className='flex flex-col w-[450px] md:w-[600px] lg:w-[800px]  mx-auto mt-5'>
          <div className='flex  justify-center items-center '>
            <div className='flex flex-col gap-y-5 items-center'>
              <h2>
                <span className='font-bold'>İade Edilecek Sipariş No:</span>{' '}
                {orderID}
              </h2>
              <h2>
                <span className='font-bold'>User No:</span> {userID}
              </h2>
              <h2>
                <span className='font-bold'>Mesaj No:</span> {messageID}
              </h2>

              <div className='flex flex-wrap justify-center  gap-x-8 gap-y-4 '>
                {orderItems?.map((item, index) => (
                  <div key={index} className='flex gap-x-6 '>
                    <div className=''>
                      <Link to={`/product/${item?.product}`}>
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className='w-32 h-32 object-cover'
                        />
                      </Link>
                    </div>
                    <div className='flex flex-col max-w-96'>
                      <div className=''>
                        <p>{item?.name}</p>
                      </div>

                      <div className=''>
                        <p>₺{item?.price}</p>
                      </div>

                      <div className=''>
                        <p>
                          <span className='font-bold'>{item?.amount}</span> Adet
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <h2>
                <span className='font-bold'>Toplam Tutar: </span>{' '}
                <span className='text-red-500'>₺{totalAmount}</span>
              </h2>
            </div>
          </div>

          <div className=''>
            <form className='shadow rounded bg-white p-2 mx-4'>
              <h2 className='text-2xl font-bold mb-4 text-center italic'>
                Sipariş İadesi Cevap Formu
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
                  İade cevabını yazınız
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
                  className='btn w-96 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                  onClick={submitHandler}
                  disabled={reqIsLoading}
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ReMessages
