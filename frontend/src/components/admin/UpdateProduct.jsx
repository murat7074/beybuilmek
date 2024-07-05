import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { HexColorPicker } from 'react-colorful'

import MetaData from '../layout/MetaData'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_CATEGORIES } from '../../constants/constants'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../redux/api/productsApi'

import { FaTrashAlt, FaExchangeAlt } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import {
  setProductItemForUpdate,
  removeColorItem,
  addColorItem,
  changeStockForColorItem,
} from '../../redux/features/productSlice'

const UpdateProduct = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const params = useParams()

  const id = params?.id

  const { colors } = useSelector((state) => state.product)


  const [productColor, setProductColor] = useState('#000')
  const [num, setNumb] = useState('')
  const [newStock, setNewStock] = useState('')
  const [imageToUi, setImageToUi] = useState('')

  const stockOnChange = (e, color) => {
    const newColorStock = parseInt(e.target.value, 10) 

    
    setNewStock({ color, colorStock: newColorStock })
  }

  const changeStock = (e) => {
    e.preventDefault()
   
    dispatch(changeStockForColorItem(newStock))
  }
  const numOnchange = (e) => {
    const value = Number(e.target.value)
    setNumb(value)
  }

  const addColorSubmit = (e) => {
    e.preventDefault()

    dispatch(addColorItem({ color: productColor, colorStock: num }))
  }

  const colorDeleteSubmit = (col) => {
    dispatch(removeColorItem({ color: col }))
  }



  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    seller: '',
    featured: '',
    freeShipping: '',
    features:"",
  })

  const { name, description, price, category, seller, featured, freeShipping,features } =
    product

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation()

  const { data } = useGetProductDetailsQuery(id) 

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        description: data?.product?.description,
        price: data?.product?.price,
        category: data?.product?.category,
        seller: data?.product?.seller,
        featured: data?.product?.featured,
        freeShipping: data?.product?.freeShipping,
        features: data?.product?.features || "features",
      })

      dispatch(setProductItemForUpdate(data?.product?.colors))
      setImageToUi(data?.product?.images?.[0]?.url)
    }

    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Ürün Güncellendi')
      navigate('/admin/products')
      window.location.reload() 
    }
  }, [error, isSuccess, data, id])

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const body = { ...product, colors }
    updateProduct({ id: params?.id, body })
  }

  return (
    <AdminLayout>
      <MetaData title={'Ürün Güncelle'} />

      <div className='flex flex-col justify-center mb-4 p-2 '>
       
        <div className='flex justify-center items-center gap-x-10 border-2 border-gray-200 p-2'>
          <h2 className='font-bold'>Ürün Güncelle    (<span className='font-normal text-xs md:text-sm text-red-500'>
              Ürün resimlerini Ürünler sayfasından güncelleyebilirsiniz
            </span>
            )</h2>
          <img src={imageToUi} alt={name} className='object-cover h-16 w-16' />
        </div>

        <div className='mt-2'>
          <form className='rounded-md border-2 border-gray-200 p-2 '>
            {/* colors start */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-[1fr,1.5fr,1fr] gap-3 justify-between w-full'>
              <div className='flex justify-center '>
                <div className='flex flex-col gap-y-1'>
                  <label htmlFor='' className='font-bold'>
                    Renk seç
                  </label>
                  <HexColorPicker
                    color={productColor}
                    onChange={setProductColor}
                  />
                </div>
              </div>
              {/* ADD COLOR */}
              <div className='flex justify-center'>
                <div className='flex flex-col'>
                  <h2 className='font-bold'>Renk Ekle</h2>
                  <div className='grid gap-2  '>
                    <div>
                      <label htmlFor='' className='font-semibold'>
                        renk (<span className='text-xs text-red-500'>"blue" veya "red" gibi yazılabilinir.</span>)
                      </label>
                 

                          <div className='flex items-center gap-2'>
                          <input type="text" value={productColor} onChange={(e)=>setProductColor(e.target.value)} className='w-20 border-2' />
                          <span
                            style={{ backgroundColor: `${productColor}` }}
                            className='w-4 h-4 rounded-full'
                          ></span>
                        </div>
                    </div>

                    <div>
                      <h2 className='font-semibold'>Renk Stok :</h2>
                      <input
                        className='border border-black text-center w-44'
                        type='number'
                        value={num}
                        placeholder='stok'
                        onChange={numOnchange}
                      />
                    </div>
                  </div>
                  <button
                    type='button'
                    className='btn btn-info btn-xs text-sm w-44 my-2 '
                    onClick={addColorSubmit}
                  >
                    ekle
                  </button>
                </div>
              </div>
              {/* DISPLAY */}
              <div className='flex  '>
                <div className='flex flex-col'>
                  <h2 className='text-center font-bold'>Göster</h2>
                  <div className=' flex flex-col gap-1 '>
                    {colors?.map((item) => {
                      return (
                        <div
                          key={item?.color}
                          className='flex items-center gap-x-3 bg-zinc-200 rounded-lg p-1'
                        >
                          <h3
                            className=' p-1'
                            style={{ color: `${item?.color}` }}
                          >
                            {item?.color}
                          </h3>

                          <span
                            style={{ backgroundColor: `${item?.color}` }}
                            className='h-4 w-4 rounded-full'
                          ></span>

                          <input
                            type='text'
                            id='stock_field'
                            className='form-control w-16 h-7 text-center'
                            name={item?.color}
                            defaultValue={item.colorStock}
                            onChange={(e) => stockOnChange(e, item?.color)}
                          />
                          <button
                            className='btn btn-primary text-sm h-7 '
                            onClick={changeStock}
                          >
                            <FaExchangeAlt />
                          </button>

                          <button
                            type='button'
                            className='btn bg-red-400 hover:bg-red-500 text-sm h-7'
                            onClick={() => colorDeleteSubmit(item.color)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* colors end */}
          </form>

          <div className='mt-2'>
            <form
              className='rounded-md border-2 border-gray-200 p-2'
              onSubmit={submitHandler}
            >
              <div className='flex flex-col p-2'>
                <div className=' flex flex-wrap justify-between gap-x-4 px-1'>
                  {/* description */}
                  <div className='flex flex-col gap-y-1'>
                    <label htmlFor='description_field' className='font-bold'>
                       Kısa Ürün Tanımı
                    </label>
                    <textarea
                      className='form-control min-w-48 min-h-44 pl-2 border-2 border-black rounded-sm'
                      id='description_field'
                      rows=''
                      name='description'
                      value={description}
                      onChange={onChange}
                    ></textarea>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <label htmlFor='features_field' className='font-bold'>
                        Ürün Özellikleri
                    </label>
                    <textarea
                      className='form-control min-w-48 min-h-44 pl-2 border-2 border-black rounded-sm'
                      id='features_field'
                      rows=''
                      name='features'
                      value={features}
                      onChange={onChange}
                    ></textarea>
                  </div>

                  <div className='flex flex-col justify-between gap-x-4 gap-y-2'>
                    {/* name */}
                    <div className='flex flex-col gap-y-1'>
                      <label htmlFor='name_field' className='font-bold'>
                        {' '}
                        Ürün Adı{' '}
                      </label>
                      <input
                        type='text'
                        id='name_field'
                        className='form-control border-2 pl-2 border-black rounded-sm min-w-48'
                        name='name'
                        value={name}
                        onChange={onChange}
                      />
                    </div>
                    {/* price */}
                    <div className='flex flex-col gap-y-1'>
                      <label htmlFor='price_field' className='font-bold'>
                        {' '}
                        Fiyat{' '}
                      </label>
                      <input
                        type='text'
                        id='price_field'
                        className='form-control border-2 pl-2 border-black rounded-sm min-w-48'
                        name='price'
                        value={price}
                        onChange={onChange}
                      />
                    </div>

                    {/* category */}
                    <div className='flex flex-col gap-y-1'>
                      <label htmlFor='category_field' className='font-bold'>
                        {' '}
                        Kategori{' '}
                      </label>
                      <select
                        className='form-control pl-2 border-2 border-black rounded-sm min-w-48'
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

                <hr className='my-4' />

                <div className='flex flex-wrap justify-between gap-y-2'>
                  {/* seller */}
                  <div className='flex flex-col gap-y-1'>
                    <label htmlFor='seller_field' className='font-bold'>
                      {' '}
                      Satıcı{' '}
                    </label>
                    <input
                      type='text'
                      id='seller_field'
                      className='form-control min-w-48 pl-2 border-2 border-black rounded-sm'
                      name='seller'
                      value={seller}
                      onChange={onChange}
                    />
                  </div>

                  {/* Featured */}
                    <div className='flex flex-col gap-y-1'>
                    <label htmlFor='featured' className='font-bold'>
                      {' '}
                      Ana sayfa Ürünü{' '}
                    </label>
                    <select
                      className='form-control min-w-48 pl-2 border-2 border-black rounded-sm'
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
                <div className='flex flex-col gap-y-1'>
                    <label htmlFor='freeShipping' className='font-bold'>
                      {' '}
                       Ücretsiz Kargo{' '}
                    </label>
                    <select
                      className='form-control min-w-48 pl-2 border-2 border-black rounded-sm'
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
              </div>

         <div className='flex items-center justify-center'>
               <button
                type='submit'
                className='btn btn-primary w-96 my-4'
                disabled={isLoading}
              >
                {isLoading ? 'Güncelleniyor...' : 'GÜNCELLE'}
              </button>
           </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default UpdateProduct
