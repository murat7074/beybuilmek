import React, { useEffect, useState } from 'react'
import { countries } from 'countries-list'
import { useAddInvoiceAddressUserMutation } from '../../../redux/api/userApi'
import UserLayout from '../../layout/UserLayout'
import MetaData from '../../layout/MetaData'
import { IoMdArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddInvoiceAddressForm = () => {
  const navigate = useNavigate()
  const [addInvoiceAddressUser, { isLoading, error, isSuccess }] =
    useAddInvoiceAddressUserMutation()

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
      addInvoiceAddressUser(addressInfo)
    } else {
      toast.error('Eksik bilgi: Lütfen tüm alanları doldurun.')
    }
  }
  const inputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setAddressInfo({ ...addressInfo, [name]: value })
  }

  const { title, userName, address, city, phoneNo, zipCode, country } =
    addressInfo

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

      toast.success('Fatura Adresi Eklendi')
      navigate('/me/user_address')
    }
  }, [error, isSuccess])

  return (
    <UserLayout>
      <MetaData title={'Fatura Adresi Ekle'} />
      <div className='grid grid-cols-1 max-w-[540px]  gap-4 mt-10'>
        <div>
          <Link to='/me/user_address' className='btn'>
            <IoMdArrowBack className='w-full h-full flex justify-center items-center' />
          </Link>
        </div>
        <div className='col-span-1 lg:col-span-1'>
          <form className='shadow rounded bg-white p-6'>
            <h2 className='text-2xl font-bold mb-4'>Fatura Adresi Ekle</h2>

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
                telefon No
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

            <button
              id='shipping_btn'
              type='submit'
              className='btn w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              disabled={isLoading}
              onClick={submitHandler}
            >
              EKLE
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  )
}

export default AddInvoiceAddressForm
