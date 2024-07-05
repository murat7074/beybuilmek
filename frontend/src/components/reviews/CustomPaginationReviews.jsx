
import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import StarRatings from 'react-star-ratings'

const CustomPaginationReviews = ({ reviews }) => {
  const itemsPerPage = 5

  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedReviews, setPaginatedReviews] = useState([])

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    setPaginatedReviews(reviews.slice(start, end))
  }, [currentPage, reviews])

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className='flex flex-col'>
      <div className='max-w-[1200px] mt-2 mb-10'>
        <div className='mx-auto'>
          {paginatedReviews?.map((review) => {
            if (review.featured === false) {
              return null
            }
            const date = review.createdAt
            const originalDate = new Date(date)
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            const formattedDate = originalDate.toLocaleDateString(
              'tr-TR',
              options
            )

            return (
              <div
                key={review?._id}
                className='flex md:mx-20 shadow-md mt-2 p-1 '
              >
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center gap-x-2'>
                    <img
                      src={
                        review?.user?.avatar
                          ? review?.user?.avatar?.url
                          : '/images/default_avatar.jpg'
                      }
                      alt='User Name'
                      width='50'
                      height='50'
                      className='rounded-full'
                    />
                    <p className=''> {review.user?.name}</p>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <StarRatings
                      rating={review?.rating}
                      starRatedColor='#ffb829'
                      numberOfStars={5}
                      name='rating'
                      starDimension='24px'
                      starSpacing='1px'
                    />
                    <p>{formattedDate}</p>
                  </div>
                  <p className=''>{review?.comment}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <hr />

      <div className='my-2 mx-auto'>
        {reviews?.length > itemsPerPage && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={reviews.length}
            onChange={setCurrentPageNo}
            nextPageText={
              <span
                className={`px-1 py-1 m-2 rounded-md ${
                  currentPage === Math.ceil(reviews.length / itemsPerPage)
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-blue-500 text-white'
                }`}
              >
                Sonraki
              </span>
            }
            prevPageText={
              <span
                className={`px-1 py-1 mr-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-blue-500 text-white'
                }`}
              >
                Önceki
              </span>
            }
            firstPageText={
              <span
                className={`px-1 py-1 mr-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-blue-500 text-white'
                }`}
              >
                İlk
              </span>
            }
            lastPageText={
              <span
                className={`px-1 py-1 rounded-md ${
                  currentPage === Math.ceil(reviews.length / itemsPerPage)
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-blue-500 text-white'
                }`}
              >
                Son
              </span>
            }
            itemClass='inline-block mx-1 '
            linkClass='text-black '
            activeLinkClass='text-red-500 font-bold'
            innerClass='my-4 flex justify-center'
          />
        )}
      </div>
    </div>
  )
}

export default CustomPaginationReviews









