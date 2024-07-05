import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import SalesChart from '../charts/SalesChart'
import { useLazyGetDashboardSalesQuery } from '../../redux/api/orderApi'
import { toast } from 'react-hot-toast'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1)) // ayın ilk günü olucak
  const [endDate, setEndDate] = useState(new Date())

  const [getDashboardSales, { error, isLoading, data }] =
    useLazyGetDashboardSalesQuery()

    console.log("data",data);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
      console.log(error?.data?.message)
    }

    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      })
    }
  }, [error])

  const submitHandler = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    })
  }

  if (isLoading) return <Loader />
  return (
    <AdminLayout>
      <MetaData title={'Satış Özeti'} />
      <div className='flex mt-2 min-w-[450px] lg:w-[700px] xl:w-[900px] items-center '>
        <div className='flex flex-col p-2  w-full  '>
        
        
          <div className='flex w-full justify-between '>
          
            <div className='flex flex-col gap-y-1 md:gap-y-2  lg: lg:gap-y-3'>
             
              <div className='flex gap-x-2 items-center'>
                <label className=' text-xs sm:text-sm md:text-base w-20'>
                  Başlangıç Tarihi
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className='flex text-center text-xs sm:text-sm md:text-base rounded-sm border cursor-pointer'
                />
              </div>

              <div className='flex gap-x-2 items-center'>
                <label className='text-xs sm:text-sm md:text-base w-20'>
                 Bitiş Tarihi
                </label>

                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className='flex text-center text-xs sm:text-sm md:text-base rounded-sm border cursor-pointer'
                />
              </div>

            </div>

            <button className='btn btn-primary px-5' onClick={submitHandler}>
              Getir
            </button>
          </div>

          <div className='flex flex-col mt-3'>
            <div className='flex items-center justify-center rounded-lg rounded-bl-none rounded-br-none text-white bg-success  h-16'>
              <div className=' flex flex-col text-center'>
                <p className=''> Satışlar</p>

                <span className=''>₺{data?.totalSales?.toFixed(2)}</span>
              </div>
            </div>

            <div className='flex items-center justify-center rounded-lg rounded-tl-none rounded-tr-none text-white bg-red-500 h-16'>
              <div className='flex flex-col text-center'>
                <div className='flex gap-x-4'>
                  <p className=''> Siparişler</p>

                  <span className=''>{data?.totalNumOrders}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center w-full h-full overflow-hidden '>
            <SalesChart salesData={data?.sales} />
          </div>

          <div className='mb-5'></div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
