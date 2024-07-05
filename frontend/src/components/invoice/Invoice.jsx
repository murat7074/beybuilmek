import React, { useEffect } from 'react'
import { IoPrint } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useOrderDetailsQuery } from '../../redux/api/orderApi'
import domtoimage from 'dom-to-image'
import { jsPDF } from 'jspdf'
import { calculateOrderCost } from '../../helpers/helpers'
import { IoMdArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'

const Invoice = () => {
  const params = useParams()
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id)
  const order = data?.order || {}

  const { shippingInfo, orderItems, paymentInfo, user } = order

  const { user: userRole } = useSelector((state) => state.auth)
  const backToOrderLink =
    userRole && userRole.role === 'admin'
      ? '/admin/orders'
      : userRole.role === 'user'
      ? '/me/orders'
      : ''

 
  const { itemsPrice, shippingPrice, totalPrice } =
    calculateOrderCost(orderItems) 

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
  }, [error])

  const handleDownload = () => {
    const input = document.getElementById('order_invoice')
    domtoimage
      .toPng(input)
      .then((imgData) => {
        const pdf = new jsPDF()
        const pdfWidth = pdf.internal.pageSize.getWidth()
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0)
        pdf.save(`invoice_${order?._id}.pdf`)
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error)
      })
  }

  if (isLoading) return <Loader />

  return (
    <main className='align-page min-h-screen p-4'>
      <MetaData title={'Order Invoice'} />
      <div className='order-invoice my-5 max-w-5xl mx-auto'>
        <div className='flex justify-center gap-x-20 mb-5'>
          <div className='flex '>
            <button className='btn btn-success' onClick={handleDownload}>
              <IoPrint className='inline-block w-6 h-6' /> faturayı İndir
            </button>
          </div>

          <div className=''>
            <Link
              to={backToOrderLink}
              className='btn btn-ghost border-md border-gray-200 text-xs'
            >
              <IoMdArrowBack style={{ width: '25px', height: '25px' }} />
              Siparişlerime Dön
            </Link>
          </div>
        </div>
        <div id='order_invoice' className='p-8 border border-gray-300'>
          <header className='flex justify-between mb-8'>
            <div id='logo'>
              <h2 className='text-2xl font-bold'>Beybuilmek</h2>
            </div>
            <div className='text-right'>
              <h1 className='text-xl font-bold'>FATURA # {order?._id}</h1>
              <div>Beybuilmek</div>
              <div>Donanma Mah,</div>
              <div>İlhantuba Cad.</div>
              <div>(542) 519-0450</div>
              <div>
                <a href='mailto:info@shopit.com'>beybuilmek@gmail.com</a>
              </div>
            </div>
          </header>
          <div id='project' className='mb-8'>
            <div className='flex justify-between'>
              <div>
                <div>
                  <span className='font-semibold'>İsim: </span>
                  <span className='uppercase'>{shippingInfo?.userName}</span>
                </div>
                <div>
                  <span className='font-semibold'>Email: </span>
                  {user?.email}
                </div>
                <div>
                  <span className='font-semibold'>Telefon: </span>
                  {shippingInfo?.phoneNo}
                </div>
                <div className='flex items-center'>
                  <h4 className='font-semibold  text-sm'>Teslimat Adresi:</h4>
                  <div className='pl-1'>
                    {shippingInfo?.address}, {shippingInfo?.city},{' '}
                    {shippingInfo?.zipCode}, {shippingInfo?.country}
                  </div>
                </div>{' '}
              </div>
              <div className='text-right'>
                <div>
                  <span className='font-semibold'>Tarih: </span>
                  {new Date(order?.createdAt).toLocaleString('en-GB')}
                </div>
                <div>
                  <span className='font-semibold'>Durum: </span>
                  {paymentInfo?.status === 'paid'
                    ? 'Ödendi'
                    : paymentInfo?.status === 'Not Paid'
                    ? 'Kapıda Ödeme'
                    : ''}
                </div>
              </div>
            </div>
          </div>
          <main>
            <table className='w-full mt-5 border-collapse'>
              <thead>
                <tr>
                  <th className='border p-2 text-left'>Ürün No</th>
                  <th className='border p-2 text-left'>İsim</th>
                  <th className='border p-2 text-right'>Fiyat</th>
                  <th className='border p-2 text-right'>Miktar</th>
                  <th className='border p-2 text-right'>Toplam</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className='border p-2'>{item?.product}</td>
                      <td className='border p-2'>{item?.name}</td>
                      <td className='border p-2 text-right'>
                        ₺{Number(item?.price).toFixed(2)}
                      </td>
                      <td className='border p-2 text-right'>{item?.amount}</td>
                      <td className='border p-2 text-right'>
                        ₺{Number(item?.price * item?.amount).toFixed(2)}
                      </td>
                    </tr>
                  )
                })}

                <tr>
                  <td colSpan='4' className='border p-2 text-right'>
                    <b>ARA TOPLAM</b>
                  </td>
                  <td className='border p-2 text-right'>₺{itemsPrice}</td>
                </tr>
                <tr>
                  <td colSpan='4' className='border p-2 text-right'>
                    <b>VERGİ 8%</b>
                  </td>
                  <td className='border p-2 text-right'>₺{order?.taxAmount}</td>
                </tr>
                <tr>
                  <td colSpan='4' className='border p-2 text-right'>
                    <b>KARGO</b>
                  </td>
                  <td className='border p-2 text-right'>
                    ₺{order?.shippingAmount}
                  </td>
                </tr>
                <tr>
                  <td colSpan='4' className='border p-2 text-right'>
                    <b>GENEL TOPLAM</b>
                  </td>
                  <td className='border p-2 text-right'>
                    ₺{order?.totalAmount}
                  </td>
                </tr>
              </tbody>
            </table>
            <div id='notices' className='mt-8'>
              <div className='font-semibold'>NOT:</div>
              <div className='text-sm'>
             30 gün sonra ödenmemiş bakiyeler için %1,5 finansman ücreti alınacaktır.
              </div>
            </div>
          </main>
          <footer className='mt-8 text-center text-sm'>
         
         Fatura bilgisayarda oluşturulmuştur ve imza olmadan geçerlidir.
          </footer>
        </div>
      </div>
    </main>
  )
}

export default Invoice

