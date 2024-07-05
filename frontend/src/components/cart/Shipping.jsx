import React, { useEffect, useState } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../redux/features/cartSlice'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import ShippingAddress from './ShippingAddress'
import { FaPlus } from 'react-icons/fa6'
import {
  useAddDeliveryAddressUserMutation,
  useAddInvoiceAddressUserMutation,
} from '../../redux/api/userApi'
import toast from 'react-hot-toast'

const Shipping = () => {

   // Ülkelerin (sadece Turkey) isimlerini Türkçeye çevirmek için basit bir fonksiyon
  const getCountryNameInTurkish = (countryCode) => {
    const country = countries[countryCode]
    if (country.name === 'Turkey') {
      return 'Türkiye'
    }
    return country.name
  }

  const countriesList = Object.keys(countries).map((code) => ({
    code,
    name: getCountryNameInTurkish(code),
   
  }))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addDeliveryAddressUser, { isLoading, error, isSuccess }] =
    useAddDeliveryAddressUserMutation()

  const [
    addInvoiceAddressUser,
    { isLoading: isInvLoading, error: isInverror, isSuccess: isInvSuccess },
  ] = useAddInvoiceAddressUserMutation()


  const { address: userAddress } = useSelector((state) => state.auth.user)



  const [addressFromSaved, setAddressFromSaved] = useState({})

  const [addressInfo, setAddressInfo] = useState({
    title: '',
    userName: '',
    addressID: '',
    address: '',
    city: '',
    zipCode: '',
    phoneNo: '',
    country: 'Türkiye',
  })

  const inputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setAddressInfo({ ...addressInfo, [name]: value })
  }

  const {
    title,
    address,
    city,
    phoneNo,
    zipCode,
    country,
    userName,
    addressID,
  } = addressInfo

  const submitHandler = (e) => {
    e.preventDefault()

    if (address && userName && city && phoneNo && zipCode && country && title) {
      dispatch(
        saveShippingInfo({
          address,
          userName,
          city,
          phoneNo,
          zipCode,
          country,
          title,
        })
      )

      setAddressInfo({
        title: '',
        userName: '',
        addressID: '',
        address: '',
        city: '',
        zipCode: '',
        phoneNo: '',
        country: 'Türkiye',
      })
      navigate('/shipping_invoice_address')
    } else {
      // Eksik bilgi olduğunda yapılacak işlemler buraya yazılabilir
      toast.error('Eksik bilgi: Lütfen tüm alanları doldurun.')
    }
  }

  const getAddressID = (id, type) => {
    setAddressFromSaved({ id, type })
  }
  const addNewAddress = (e) => {
    e.preventDefault()
    const { title, userName, address, city, phoneNo, zipCode, country } =
      addressInfo

    const data = { title, userName, address, city, phoneNo, zipCode, country }
    //  console.log("Teslimat addressInfo",data)
    addDeliveryAddressUser(data)
  }
  const addInvoiceAddress = (e) => {
    e.preventDefault()
    const { title, address, city, phoneNo, zipCode, country } = addressInfo

    const data = { title, address, city, phoneNo, zipCode, country }
    //  console.log("fatura addressInfo",data)
    addInvoiceAddressUser(data)
  }

  useEffect(() => {
    if (error || isInverror) {
      toast.error(error?.data?.message || isInverror?.data?.message)
    }

    if (isSuccess || isInvSuccess) {
      toast.success('Adres Eklendi')
    }
  }, [error, isSuccess, isInverror, isInvSuccess])

  useEffect(() => {
    if (addressFromSaved.type === 'delivery_address') {
      let newForm = userAddress.delivery_address.find(
        (item) => item.addressID === addressFromSaved.id
      )
      if (newForm) {
        setAddressInfo(newForm)
      }
    }
    if (addressFromSaved.type === 'invoice_address') {
      let newForm = userAddress.invoice_address.find(
        (item) => item.addressID === addressFromSaved.id
      )
      if (newForm) {
        setAddressInfo(newForm)
      }
    }
  }, [addressFromSaved])

  return (
    <>
      <div className=' flex justify-center items-center'>
        <CheckoutSteps shipping />
      </div>

      <main className='align-page  '>
        <div className='flex justify-center'>
          <div className=' flex flex-col  max-w-[760px]'>
            <MetaData title={'Adres'} />

            <div>
              <h2 className='pl-4'>Kayıtlı adresimi kullan</h2>
            </div>
            <div className='flex flex-col justify-center'>
              <ShippingAddress getAddressID={getAddressID} />
            </div>

            <div className=''>
              <div className='max-w-[540px]   '>
                <form className='shadow rounded  p-6'>
                  <h2 className='text-2xl font-bold mb-2'>
                    Teslimat Adresi Giriniz
                  </h2>

                  <div className='mb-3'>
                    <label
                      htmlFor='address_field'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                       Adres Kısayolu
                    </label>
                    <input
                      type='text'
                      id='address_field'
                      className='w-full p-2 border border-gray-300 rounded'
                      name='title'
                      value={title}
                      onChange={inputChange}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <label
                      htmlFor='name_field'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      İsim & Soyisim
                    </label>
                    <input
                      type='text'
                      id='name_field'
                      className='w-full p-2 border border-gray-300 rounded'
                      name='userName'
                      value={userName}
                      onChange={inputChange}
                      required
                    />
                  </div>
                  <div className='mb-3'>
                    <label
                      htmlFor='address_field'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Adres
                    </label>
                    <input
                      type='text'
                      id='address_field'
                      className='w-full p-2 border border-gray-300 rounded'
                      name='address'
                      value={address}
                      onChange={inputChange}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <label
                      htmlFor='city_field'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Şehir
                    </label>
                    <input
                      type='text'
                      id='city_field'
                      className='w-full p-2 border border-gray-300 rounded'
                      name='city'
                      value={city}
                      onChange={inputChange}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <label
                      htmlFor='phone_field'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                     Telefon No
                    </label>
                    <input
                      type='tel'
                      id='phone_field'
                      className='w-full p-2 border border-gray-300 rounded'
                      name='phoneNo'
                      value={phoneNo}
                      onChange={inputChange}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <label
                      htmlFor='zip_code_field'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Posta Kodu
                    </label>
                    <input
                      type='number'
                      id='zip_code_field'
                      className='w-full p-2 border border-gray-300 rounded'
                      name='zipCode'
                      value={zipCode}
                      onChange={inputChange}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <label
                      htmlFor='country_field'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Ülke
                    </label>
                    <select
                      id='country_field'
                      className='w-full p-2 border border-gray-300 rounded'
                      name='country'
                      value={country}
                      onChange={inputChange}
                      required
                    >
                      {countriesList?.map((country) => (
                        <option key={country?.name} value={country?.name}>
                          {country?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='flex md:justify-between my-2  md:gap-x-2'>
                    <button
                      className='btn btn-primary  '
                      disabled={isLoading}
                      onClick={addNewAddress}
                    >
                      <span className='flex flex-row gap-x-2 items-center'>
                        <FaPlus className='font-bold' />{' '}
                        <span className='text-center'>
                          Teslimat Adreslerime Ekle
                        </span>
                      </span>
                    </button>

                    <button
                      className='btn btn-ghost border-1 border-black '
                      disabled={isInvLoading}
                      onClick={addInvoiceAddress}
                    >
                      <span className='flex flex-row gap-x-2 items-center'>
                        <FaPlus className='font-bold' />{' '}
                        <span className='text-center'>
                          Fatura Adreslerime Ekle
                        </span>
                      </span>
                    </button>
                  </div>

                  <button
                    id='shipping_btn'
                    type='submit'
                    className='btn w-full py-2 bg-green-500 text-white rounded hover:bg-green-600'
                    onClick={submitHandler}
                  >
                   İLERLE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Shipping
