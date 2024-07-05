import React, { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import { HexColorPicker } from 'react-colorful'

import MetaData from '../layout/MetaData'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_CATEGORIES } from '../../constants/constants'
import { useCreateProductMutation } from '../../redux/api/productsApi'
import { FaTrashAlt } from 'react-icons/fa'

const NewProduct = () => {
  const navigate = useNavigate()

  const [productColor, setProductColor] = useState('#000')
  const [num, setNumb] = useState('')

  const [colors, setColors] = useState([])

  const numOnchange = (e) => {
    const value = e.target.value
    setNumb(value)
  }

  const colorSubmit = (e) => {
    e.preventDefault()

    setColors((prev) => [
      ...prev,
      { color: productColor, colorStock: Number(num) },
    ])
  }

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Bayan Çanta',
    features: '',
    seller: 'Beybuilmek',
    featured: 'false',
    freeShipping: 'false',
  })

  const {
    name,
    description,
    price,
    category,
    seller,
    featured,
    freeShipping,
    features,
  } = product

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation()

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Ürün Oluşturuldu.')
      navigate('/admin/products')
    }
  }, [error, isSuccess])

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const productData = { ...product, colors }

    createProduct(productData)
  }

  const colorDeleteSubmit = (col) => {
    setColors((prev) => {
      return prev.filter((item) => item.color !== col)
    })
  }

  return (
    <AdminLayout>
      <MetaData title={'Yeni Ürün Ekle'} />
      <div className='flex lg:min-w-[800px] xl:min-w-[900px] p-2  '>
        <div className='flex flex-col mb-4 p-2  w-full'>
          <h2 className='mb-2 text-center font-bold'>
            Yeni Ürün (
            <span className='font-normal text-xs md:text-sm text-red-500'>
              Ürün resimlerini Ürünler sayfasından yükleyebilirsiniz
            </span>
            )
          </h2>
          <form className='rounded-md mt-2'>
            <div className='flex flex-col gap-y-2'>
              {/* name */}
              <div className='mb-3'>
                <label htmlFor='name_field' className='font-bold'>
                  {' '}
                  Ürün Adı{' '}
                </label>
                <input
                  type='text'
                  id='name_field'
                  className='form-control border-2 border-black rounded-sm min-w-48 pl-2'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
              </div>

              <p className='font-normal text-center text-xs md:text-sm text-red-500'>
                Önce Ürün rengi ve stok miktarını "renk ekle" ye tıklayarak
                giriniz.
              </p>

              {/* colors start */}
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2 border-2 border-gray-200 p-1'>
                <div>
                  <label className='font-bold'>Renk Seç</label>
                  <HexColorPicker
                    color={productColor}
                    onChange={setProductColor}
                  />
                </div>

                {/* display */}
                <div className=''>
                  <h2 className='text-center font-bold'>Göster</h2>
                  {colors?.map((item, index) => {
                    return (
                      <div key={index} className='flex items-center gap-x-2'>
                        <h3 className='w-16 p-2'>{item.color}</h3>
                        <span
                          style={{ backgroundColor: `${item.color}` }}
                          className='w-4 h-4 rounded-full'
                        ></span>
                        <p className=''>{item.colorStock} adet</p>

                        <button
                          type='button'
                          className='hover:scale-105 cursor-pointer'
                          onClick={() => colorDeleteSubmit(item.color)}
                        >
                          <FaTrashAlt
                            style={{
                              height: '14px',
                              width: '14px',
                              color: 'red',
                            }}
                          />
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* add color */}
                <div className=''>
                  <div className='flex flex-col'>
                    <h2 className='font-bold'>Renk Ekle</h2>
                    <div className='grid gap-2  '>
                      <div>
                        <label htmlFor='' className='font-bold'>
                          renk (
                          <span className='text-xs text-red-500'>
                            "blue" veya "red" gibi yazılabilinir.
                          </span>
                          )
                        </label>

                        <div className='flex items-center gap-2'>
                          <input
                            type='text'
                            value={productColor}
                            onChange={(e) => setProductColor(e.target.value)}
                            className='w-20 border-2'
                          />
                          <span
                            style={{ backgroundColor: `${productColor}` }}
                            className='w-4 h-4 rounded-full'
                          ></span>
                        </div>
                      </div>

                      <div className='flex flex-col'>
                        <label className='font-bold'>Renk Stok :</label>
                        <input
                          className='border-2 border-black rounded-sm text-center w-44'
                          type='number'
                          value={num}
                          placeholder='stok'
                          onChange={numOnchange}
                        />
                      </div>
                    </div>
                    <button
                      type='button'
                      className='btn btn-info btn-xs text-sm  w-44 my-2 '
                      onClick={colorSubmit}
                    >
                      renk ekle
                    </button>
                  </div>
                </div>
              </div>

              {/* colors end */}

              <div className='flex flex-wrap justify-between border-2 gap-x-4 px-1 border-gray-200'>
                {/* description */}
                <div className='p-1'>
                  <label htmlFor='description_field' className='font-bold'>
                    Kısa Ürün Tanımı
                  </label>
                  <textarea
                    className='form-control border-2 border-black rounded-sm min-w-48 pl-2'
                    id='description_field'
                    rows='8'
                    name='description'
                    value={description}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className='p-1'>
                  <label htmlFor='description_field' className='font-bold'>
                    Ürün Özellikleri
                  </label>
                  <textarea
                    className='form-control border-2 border-black rounded-sm min-w-48 pl-2'
                    id='description_field'
                    rows='8'
                    name='features'
                    value={features}
                    onChange={onChange}
                  ></textarea>
                </div>

                <div className='flex flex-col gap-y-2   md:gap-x-6'>
                  {/* price */}

                  <div className=''>
                    <label htmlFor='price_field' className='font-bold'>
                      {' '}
                      Fiyat{' '}
                    </label>
                    <input
                      type='text'
                      id='price_field'
                      className='form-control border-2 border-black rounded-sm min-w-48 pl-2'
                      name='price'
                      value={price}
                      onChange={onChange}
                    />
                  </div>

                  {/* category */}
                  <div className=' flex flex-col'>
                    <label htmlFor='category_field' className='font-bold'>
                      {' '}
                      Kategori{' '}
                    </label>
                    <select
                      className='form-select border-2 border-black rounded-sm min-w-48 pl-2'
                      id='category_field'
                      name='category'
                      value={category}
                      onChange={onChange}
                    >
                      {PRODUCT_CATEGORIES?.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap border-2 gap-y-2 border-gray-200 justify-between p-1'>
                {/* seller name */}
                <div className=' flex flex-col gap-y-1'>
                  <label htmlFor='seller_field' className='font-bold'>
                    {' '}
                    Satıcı{' '}
                  </label>
                  <input
                    type='text'
                    id='seller_field'
                    className='form-control border-2 border-black rounded-sm min-w-48 pl-2'
                    name='seller'
                    value={seller}
                    onChange={onChange}
                  />
                </div>

                {/* Featured */}
                <div className=' flex flex-col gap-y-1'>
                  <label htmlFor='featured' className='font-bold'>
                    {' '}
                    Ana sayfa Ürünü{' '}
                  </label>
                  <select
                    className='form-select border-2 border-black rounded-sm min-w-48 pl-2'
                    id='featured'
                    name='featured'
                    value={featured}
                    onChange={onChange}
                  >
                    <option value='false'>false</option>
                    <option value='true'>true</option>
                  </select>
                </div>
                {/* freeShipping */}
                <div className=' flex flex-col gap-y-1'>
                  <label htmlFor='freeShipping' className='font-bold'>
                    {' '}
                    Ücretsiz Kargo{' '}
                  </label>
                  <select
                    className='form-select border-2 border-black rounded-sm min-w-48 pl-2'
                    id='freeShipping'
                    name='freeShipping'
                    value={freeShipping}
                    onChange={onChange}
                  >
                    <option value='false'>false</option>
                    <option value='true'>true</option>
                  </select>
                </div>
              </div>

              <div className='flex items-center justify-center'>
                <button
                  type='submit'
                  className='btn btn-primary w-96 my-4 '
                  disabled={isLoading}
                  onClick={submitHandler}
                >
                  {isLoading ? 'Oluşturuluyor...' : 'OLUŞTUR'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default NewProduct
