import React, { useEffect, useState } from 'react'
import { countries } from 'countries-list'
import {
  useDeleteInvoiceUserAddressMutation,
  useDeleteDeliveryUserAddressMutation,
  useAddInvoiceAddressUserMutation,
  useAddDeliveryAddressUserMutation,
} from '../../../redux/api/userApi'
import UserLayout from '../../layout/UserLayout'
import MetaData from '../../layout/MetaData'
import { IoMdArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetUpdateAddress } from '../../../redux/features/userSlice'
import toast from 'react-hot-toast'

const UpdateAddressForm = () => {
  const { updateDeliveryAddress, updateInvoiceAddress, selectAdd } =
    useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [deleteInvoiceUserAddress, { isLoading: delInvLoading }] =
    useDeleteInvoiceUserAddressMutation()
  const [deleteDeliveryUserAddress, { isLoading: delDlvLoading }] =
    useDeleteDeliveryUserAddressMutation()
  const [addDeliveryAddressUser, { isLoading: addDelLoading }] =
    useAddDeliveryAddressUserMutation()
  const [addInvoiceAddressUser, { isLoading: addInvLoading }] =
    useAddInvoiceAddressUserMutation()

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

  useEffect(() => {
    if (selectAdd && selectAdd === 'delivery_address') {
      setAddressInfo({
        title: updateDeliveryAddress.title,
        userName: updateDeliveryAddress.userName,
        addressID: updateDeliveryAddress.addressID,
        address: updateDeliveryAddress.address,
        city: updateDeliveryAddress.city,
        zipCode: updateDeliveryAddress.zipCode,
        phoneNo: updateDeliveryAddress.phoneNo,
        country: updateDeliveryAddress.country,
      })
    }

    if (selectAdd && selectAdd === 'invoice_address') {
      setAddressInfo({
        title: updateInvoiceAddress.title,
        userName: updateInvoiceAddress.userName,
        addressID: updateInvoiceAddress.addressID,
        address: updateInvoiceAddress.address,
        city: updateInvoiceAddress.city,
        zipCode: updateInvoiceAddress.zipCode,
        phoneNo: updateInvoiceAddress.phoneNo,
        country: updateInvoiceAddress.country,
      })
    }
  }, [selectAdd])

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
    // Diğer bilgileri de ekleyebilirsiniz
  }))

  const deleteAddress = async (e) => {
    e.preventDefault()

    let isSuccess = false
    let errorMessage = null

    try {
      if (selectAdd && addressID && selectAdd === 'delivery_address') {
        const response = await deleteDeliveryUserAddress({ addressID })

        if (response?.data?.success) {
          isSuccess = true
        } else {
          errorMessage = response?.error?.data?.message
        }
      } else if (selectAdd && addressID && selectAdd === 'invoice_address') {
        const response = await deleteInvoiceUserAddress({ addressID })

        if (response?.data?.success) {
          isSuccess = true
        } else {
          errorMessage = response?.error?.data?.message
        }
      }
    } catch (err) {
      console.error(err)
      errorMessage = err?.message
    } finally {
      dispatch(resetUpdateAddress())
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

      if (isSuccess) {
        toast.success(
          selectAdd === 'delivery_address'
            ? 'Teslimat Adresi Silindi'
            : 'Fatura Adresi Silindi'
        )
      } else if (errorMessage) {
        toast.error(errorMessage)
      }

      navigate('/me/user_address')
    }
  }

  const updateAddress = async (e) => {
    e.preventDefault()

    // kontrol
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

    let isSuccess = false
    let errorMessage = null

    try {
      if (
        !title ||
        !address ||
        !city ||
        !phoneNo ||
        !zipCode ||
        !country ||
        !userName ||
        !addressID
      ) {
        throw new Error('Eksik bilgi: Lütfen tüm alanları doldurun.')
      }

      if (selectAdd && addressID && selectAdd === 'delivery_address') {
        // kontrol

        const response = await addDeliveryAddressUser(addressInfo)

        if (response?.data?.success) {
          isSuccess = true
        } else {
          errorMessage = response?.error?.data?.message
        }
      } else if (selectAdd && addressID && selectAdd === 'invoice_address') {
        // Fatura adresini silmek için isteği yap

        const response = await addInvoiceAddressUser(addressInfo)

        if (response?.data?.success) {
          isSuccess = true
        } else {
          errorMessage = response?.error?.data?.message
        }
      }
    } catch (err) {
      console.error(err)
      errorMessage = err?.message
    } finally {
      if (isSuccess) {
        toast.success(
          selectAdd === 'delivery_address'
            ? 'Teslimat Adresi Güncellendi'
            : 'Fatura Adresi Güncellendi'
        )
        dispatch(resetUpdateAddress())
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

        navigate('/me/user_address')
      } else if (errorMessage) {
        toast.error(errorMessage)
      }
    }
  }

  return (
    <UserLayout>
      <MetaData title={'Fatura Adresi Güncelle'} />
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

            <div className='flex flex-col gap-y-3'>
              <button
                id='shipping_btn'
                type='submit'
                className='btn w-full py-2 bg-green-500 text-white rounded hover:bg-green-700'
                disabled={addDelLoading || addInvLoading}
                onClick={updateAddress}
              >
                GÜNCELLE
              </button>
              <button
                id='shipping_btn'
                type='submit'
                className='btn w-full py-2 bg-red-500 text-white rounded hover:bg-red-700'
                disabled={delInvLoading || delDlvLoading}
                onClick={deleteAddress}
              >
                SİL
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  )
}

export default UpdateAddressForm
