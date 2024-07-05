import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import MetaData from '../../layout/MetaData'

import { IoMdArrowBack } from 'react-icons/io'

import AddressForm from './AddressForm'
import { useAddDeliveryAddressUserMutation } from '../../../redux/api/userApi'
import toast from 'react-hot-toast'

const AddDeliveryUserAddress = ({ backToPage }) => {
  const [addDeliveryAddressUser, { isLoading, error, isSuccess }] =
    useAddDeliveryAddressUserMutation()

  const [addressInfo, setAddressInfo] = useState({
    title: '',
    userName: '',
    address: '',
    city: '',
    zipCode: '',
    phoneNo: '',
    country: 'Türkiye',
  })

  const submitHandler = (e) => {
    e.preventDefault()

    const { title, address, city, phoneNo, zipCode, country, userName } =
      addressInfo

    if (address && userName && city && phoneNo && zipCode && country && title) {
      addDeliveryAddressUser(addressInfo)
    } else {
      toast.error('Eksik bilgi: Lütfen tüm alanları doldurun.')
    }
  }
  const inputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setAddressInfo({ ...addressInfo, [name]: value })
  }

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      setAddressInfo({
        title: '',
        userName: '',
        address: '',
        city: '',
        zipCode: '',
        phoneNo: '',
        country: 'Türkiye',
      })

      toast.success('Teslimat Adresi Eklendi')
      backToPage()
    }
  }, [error, isSuccess])

  return (
    <>
      <MetaData title={'Adres Ekle'} />

      <div className='flex  justify-center items-center'>
        <div className='flex flex-col'>
          <div>
            <div>
              <Link to='/me/user_address' className='btn' onClick={backToPage}>
                <IoMdArrowBack className='w-full h-full flex justify-center items-center' />
              </Link>
            </div>
            <AddressForm
              submitHandler={submitHandler}
              inputChange={inputChange}
              addressInfo={addressInfo}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddDeliveryUserAddress
