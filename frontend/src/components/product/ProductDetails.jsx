import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../redux/api/productsApi'
import { useSelector } from 'react-redux'

import StarRatings from 'react-star-ratings'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import NotFound from '../layout/NotFound'
import toast from 'react-hot-toast'
import NewReview from '../reviews/NewReview'
import ListReviews from '../reviews/ListReviews'
import AddToCart from './AddToCart'

const ProductDetails = () => {
  const params = useParams()
  const [activeImg, setActiveImg] = useState('')
  const [showReviews, setShowReviews] = useState(false)
  const listReviewsRef = useRef(null)

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  )
  const product = data?.product
  const stock = data?.product?.stock
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0]?.url
        : '/images/default_product.png'
    )
  }, [product])

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isError])

  useEffect(() => {
    if (showReviews) {
      listReviewsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showReviews])

  if (isLoading) return <Loader />

  if (error && error?.status == 404) {
    return <NotFound />
  }

  return (
    <main className='align-page min-h-screen flex-col'>
      <MetaData
        title={product?.name}
        description={product?.description}
        keywords={`product, ${product?.name}, ${product?.category}, ${product?.seller}`}
        canonicalUrl={window.location.href}
      />
      <div className='content-1 grid grid-cols-1 md:grid-cols-[1fr,1fr] md:gap-x-4 mt-3 p-1 '>
        {/* Ürün resimleri */}
        <div
          className='item-1 flex flex-col mt-5 rounded-sm md:shadow-md md:p-1'
          id='product_image'
        >
          <div className='image-active flex justify-center'>
            <img
              className='object-cover max-h-[600px]  rounded-sm'
              src={activeImg}
              alt={product?.name}
            />
          </div>
          <div className='flex justify-center items-center flex-wrap  my-4 gap-x-4 gap-y-2'>
            {product?.images?.map((img, index) => (
              <img
                key={index}
                className={`border-2  w-22 h-20 rounded-md object-cover cursor-pointer ${
                  img.url === activeImg ? 'border-red-500 scale-105' : ''
                }`}
                src={img?.url}
                alt={img?.url}
                onClick={() => setActiveImg(img?.url)}
              />
            ))}
          </div>
        </div>

        {/* Ürün bilgileri */}
        <div className='item-2 flex flex-col mt-6 gap-y-2 p-2 md:shadow-md md:p-3'>
          {/* Ürün adı */}
          <div className='name'>
            <h1>{product?.name}</h1>
          </div>
          <div className='product-number'>
            <p id='product_id'>Ürün No {product?._id}</p>
          </div>
          <hr />

          {/* Yıldız derecelendirmesi ve değerlendirme sayısı */}
          <button
            className=' stars flex hover-pointer gap-x-2'
            disabled={product?.reviews?.length < 1}
            onClick={() => setShowReviews(true)}
          >
            <StarRatings
              rating={product?.ratings}
              starRatedColor='#ffb829'
              numberOfStars={5}
              name='rating'
              starDimension='24px'
              starSpacing='1px'
            />
            <span id='no-of-reviews' className='pt-1'>
              {' '}
              ({product?.numOfReviews} Yorum){' '}
            </span>
          </button>

          <hr />

          {/* Ürün fiyatı */}
          <div className='price'>
            <p id='product_price'>
              ₺{product?.price}{' '}
              <span className='text-red-500'>(KDV Dahil)</span>
            </p>
          </div>
          <hr />

          {/* Stok durumu */}
          <div className='color-stock'>
            <p>
              <span
                id='stock_status'
                className={`${
                  product?.stock > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {product?.stock > 0 ? 'Stokta Var' : 'Tükendi'}
              </span>
            </p>
          </div>
          <hr />

          {/* Ürün açıklaması */}
          <div className='description text-wrap'>
            <p>{product?.description}</p>
          </div>
          <hr />

          {/* Ürün satıcısı */}
          <div className='seller'>
            <p id='product_seller mb-3'>
              <strong>{product?.seller}</strong> tarafından satılmaktadır.
            </p>
          </div>
          <hr />

          {/* Sepete ekle */}
          <div className='addtocart'>
            {stock > 0 && <AddToCart product={product} />}
          </div>

          {/* Yeni inceleme */}
          <div className='new-review'>
            {isAuthenticated ? (
              <NewReview productId={product?._id} />
            ) : (
              <div className=''>Yorum yapmak için giriş yapın.</div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-8 md:shadow-md '>
        <h2 className='text-center p-2 font-bold'>Ürün Açıklaması</h2>
        <hr />
        <div className='flex justify-center mx-auto max-w-[800px]'>
          <div className='flex flex-col mt-2 mb-10 '>
            <p className='p-2'>
              {product?.features || 'Ürün Özellikleri Bulunamadı.'}
            </p>
          </div>
        </div>
      </div>

      {/* Ürün değerlendirmeleri */}
      <div ref={listReviewsRef}></div>
      {showReviews && product?.reviews?.length > 0 && (
        <div className='relative content-2 mt-10 min-h-screen shadow-md'>
          <ListReviews
            reviews={product?.reviews}
            setShowReviews={setShowReviews}
            product={product}
          />
        </div>
      )}
    </main>
  )
}

export default ProductDetails
