import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import StarRatings from 'react-star-ratings'
import MetaData from '../layout/MetaData'

const Product = ({
  _id,
  images,
  name,
  price,
  description,
  colors,
  seller,
  category,
  stock,
  numOfReviews,
  ratings,
}) => {
  const image = images?.[0]?.url

  const isSmScreen = useMediaQuery({ minWidth: 640 })

  return (
    // <main className=' mx-auto shadow-md p-6 w-[250px] sm:w-[300px] max-w-[350px] '>
    <main className=' mx-auto sm:mx-0 shadow-md p-6 '>
      <MetaData
        title={name}
        description={description}
        keywords='örgü, elişi, bayan çanta, çocuk çanta, çocuk kıyafet, bebek kıyafet'
        canonicalUrl={window.location.href}
        imageUrl={image} // İsteğe bağlı: spesifik bir görsel URL'si sağlayabilirsiniz
      />

      <Link
        to={`/product/${_id}`}
        className='flex flex-col max-w-[400px] mx-auto  '
      >
        <div className='group relative rounded-sm  bg-black  '>
          <img
            src={image}
            alt={name}
            className=' sm:max-h-[350px] md:h-[350px] lg:h-[280px] min-w-full rounded-sm object-cover ease-in-out group-hover:opacity-50'
          />

          <p className='absolute group-hover:opacity-100 flex items-center content-center rounded-full w-10 h-10 cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 ease-in-out'>
            <FaSearch className='text-white w-4 h-4' />
          </p>
        </div>

        <div className='flex justify-between items-center mt-1  '>
          <div className='flex items-center gap-x-1'>
            <StarRatings
              rating={ratings}
              starRatedColor='#ffb829'
              numberOfStars={5}
              name='rating'
              starDimension={isSmScreen ? '14px' : '12px'}
              starSpacing='1px'
            />
            <span id='no_of_reviews' className='text-sm'>
              ({numOfReviews})
            </span>
          </div>

          <div className=' flex flex-wrap max-w-20 gap-1'>
            {colors.map((color) => {
              return (
                <div key={color.color} className='flex '>
                  <span
                    style={{ background: color.color }}
                    className='flex justify-center items-center w-4 h-4 rounded-3xl  opacity-50'
                  ></span>
                </div>
              )
            })}
          </div>
        </div>

        <footer className='flex justify-between items-center mb-1 text-xs sm:text-sm'>
          <h5 className='min-w-20 '>{name}</h5>
          <p className='font-semibold '>₺{price}</p>
        </footer>
      </Link>
    </main>
  )
}

export default Product
