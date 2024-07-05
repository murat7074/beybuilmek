import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import { useMediaQuery } from 'react-responsive'
import MetaData from '../layout/MetaData'

const ListView = ({ products }) => {
  const isSmScreen = useMediaQuery({ minWidth: 640, maxWidth: 767 })
  const isMdScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isLgScreen = useMediaQuery({ minWidth: 1024 })

  return (
    <div className='p-2 my-2 text-xs lg:text-base '>
      <main className='flex flex-col gap-y-2 '>
        {products.map((product) => {
          const {
            _id,
            images,
            name,
            price,
            description,
            colors,
            seller,
            category,
            stock,
          } = product
          const image = images?.[0]?.url

          let starDimension = '11px'
          let starSpacing = '1px'

          if (isSmScreen) {
            starDimension = '12px'
            starSpacing = '1px'
          } else if (isMdScreen) {
            starDimension = '14px'
            starSpacing = '1px'
          } else if (isLgScreen) {
            starDimension = '16px'
            starSpacing = '2px'
          }

          return (
            <article
              key={_id}
              className='shadow-md rounded-sm grid grid-cols-2 gap-x-4 items-center p-2 '
            >
              <MetaData
                title={name}
                description={description}
                keywords='örgü, elişi, bayan çanta, çocuk çanta, çocuk kıyafet, bebek kıyafet'
                canonicalUrl={window.location.href}
                imageUrl={image}
              />
              <img
                src={image}
                alt={name}
                className='w-[150px] h-[120px] md:w-[190px] md:h-[175px] lg:w-[300px] lg:h-[275px] xl:w-[325px] xl:h-[300px]   object-cover rounded-2xl block '
              />

              <div className='flex flex-col md:gap-y-1 lg:gap-y-2 '>
                <h4 className=' font-bold'>{name}</h4>
                <h5 className=' font-semibold text-blue-600'>₺{price}</h5>

                <p className='text-xs md:text-sm lg:text-base'>
                  {isSmScreen
                    ? description.length > 90
                      ? description.substring(0, 90) + '...'
                      : description
                    : isMdScreen
                    ? description.length > 170
                      ? description.substring(0, 170) + '...'
                      : description
                    : isLgScreen
                    ? description.length > 250
                      ? description.substring(0, 250) + '...'
                      : description
                    : description.length > 50
                    ? description.substring(0, 50) + '...'
                    : description}
                </p>

                {isMdScreen ||
                  (isLgScreen && (
                    <div className=' flex gap-1'>
                      {colors.map((color) => {
                        return (
                          <div key={color.color} className='flex'>
                            <span
                              style={{ background: color.color }}
                              className='flex justify-center items-center w-4 h-4 rounded-3xl  opacity-50'
                            ></span>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                <div className='flex items-center gap-x-1'>
                  <StarRatings
                    rating={product?.ratings}
                    starRatedColor='#ffb829'
                    numberOfStars={5}
                    name='rating'
                    starDimension={starDimension}
                    starSpacing={starSpacing}
                  />
                  <span id='no_of_reviews' className='text-sm'>
                    ({product.numOfReviews})
                  </span>
                </div>

                <Link
                  to={`/product/${_id}`}
                  className='btn btn-primary btn-xs lg:btn-sm my-1 w-20 lg:w-28 hover:scale-105'
                >
                  İncele
                </Link>
              </div>
            </article>
          )
        })}
      </main>
    </div>
  )
}

export default ListView
