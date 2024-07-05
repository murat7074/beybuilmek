import React, { useEffect, useState } from 'react'
import { useMyOrdersQuery } from '../../redux/api/orderApi'
import Loader from '../layout/Loader'
import { toast } from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import FilteredOrders from './FilteredOrders'
import CustomButtonGroup from '../utilities/CustomButtonGroup'

const MyOrders = () => {
  const { data, isLoading, error } = useMyOrdersQuery()

  const [filterOrders, setFilterOrders] = useState('All')
  const [ordersData, setOrdersData] = useState([])

  const buttonData = [
    { name: 'All', label: 'Bütün Siparişlerim' },
    { name: 'Processing', label: 'Hazırlananlar' },
    { name: 'Shipped', label: 'Kargodakiler' },
    { name: 'Delivered', label: 'Teslim Edilenler' },
    { name: 'Returned', label: 'İade Edilenler' },
    { name: 'Return-Processing', label: 'İade Sürecindekiler' },
    { name: 'Deleted', label: 'İptal Edilenler' },
  ]

  const filterOrderHandle = (e) => {
    e.preventDefault()

    setFilterOrders(e.target.name)
  }

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
  }, [error])

  useEffect(() => {
    let filterData = ''
    if (data) {
      filterData = data?.orders?.filter((order) => {
        if (filterOrders === 'All') return order
        else {
          return order.orderStatus === filterOrders
        }
      })
    }

    setOrdersData(filterData)
  }, [data, filterOrders])

  if (isLoading) return <Loader />

  return (
    <>
      <div className='align-page min-h-screen '>
        <h2 className='text-center font-bold mt-3'>Siparişlerim</h2>
        <MetaData title={'Siparişlerim'} />
        <div className='flex flex-col gap-y-5 mt-1'>
          <div className='mt-2'>
            <CustomButtonGroup
              btnData={buttonData}
              type={filterOrders}
              btnHandle={filterOrderHandle}
            />
          </div>
          <div>
            <FilteredOrders dataInfo={ordersData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyOrders
