import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'
import CustomPaginationReviews from './CustomPaginationReviews'

const ListReviews = ({ reviews, setShowReviews, product }) => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='flex flex-col max-w-[1200px] mx-10 mb-5 relative'>
      <div className='header flex flex-col content-center items-center gap-y-2 mb-2 border-2 p-2'>
        <h3 className='font-bold mb-5'>Ürün Değerlendirmesi</h3>

        <p className='font-extrabold '>
          {product && typeof product.ratings === 'number'
            ? product.ratings.toFixed(1)
            : 'N/A'}
        </p>

        <div>
          <StarRatings
            rating={product?.ratings}
            starRatedColor='#ffb829'
            numberOfStars={5}
            name='rating'
            starDimension='24px'
            starSpacing='1px'
          />
        </div>

        <p>
          <span className='font-bold'>{product?.numOfReviews}</span>{' '}
          Değerlendirme
        </p>
      </div>

      {/* reviews */}

      <CustomPaginationReviews reviews={reviews} />

      {showButton && (
        <div className='fixed bottom-32 right-1 md:right-10 lg:right-20'>
          <button
            className='flex items-center gap-x-1 font-bold'
            onClick={() => {
              scrollToTop()
              setShowReviews()
            }}
          >
            {' '}
            <span>Geri Dön</span> <MdKeyboardDoubleArrowUp />
          </button>
        </div>
      )}
    </div>
  )
}

export default ListReviews
