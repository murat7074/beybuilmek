import React from 'react'
import { countries } from 'countries-list'

const AddressForm = ({ inputChange, submitHandler, addressInfo, loading }) => {
  const { title, userName, address, city, phoneNo, zipCode, country } =
    addressInfo

  // Ülkelerin (sadece Turkey) isimlerini Türkçeye çevirmek için
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

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10'>
      <div className='col-span-1 lg:col-span-1'>
        <form className='shadow rounded bg-white p-6'>
          <h2 className='text-2xl font-bold mb-4'>Teslimat Adresi Ekle</h2>

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

          <button
            id='shipping_btn'
            type='submit'
            className='btn w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            disabled={loading}
            onClick={submitHandler}
          >
            EKLE
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddressForm
