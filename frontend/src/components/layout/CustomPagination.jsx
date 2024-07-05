import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState()

  let [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const page = Number(searchParams.get('page')) || 1

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)

    if (searchParams.has('page')) {
      searchParams.set('page', pageNumber)
    } else {
      searchParams.append('page', pageNumber)
    }

    const path = window.location.pathname + '?' + searchParams.toString()
    navigate(path)
  }

  const totalPages = Math.ceil(filteredProductsCount / resPerPage)
  return (
    <div className='my-10 mx-auto text-xs md:text-sm lg:text-base'>
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={
            <span
              className={`px-1 py-1 m-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 cursor-pointer'
              } text-white`}
            >
              Sonraki
            </span>
          }
          prevPageText={
            <span
              className={`px-1 py-1 mr-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 cursor-pointer'
              } text-white`}
            >
              Önceki
            </span>
          }
          firstPageText={
            <span
              className={`px-1 py-1 mr-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 cursor-pointer'
              } text-white`}
            >
              İlk
            </span>
          }
          lastPageText={
            <span
              className={`px-1 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 cursor-pointer'
              } text-white`}
            >
              Son
            </span>
          }
          itemClass='inline-block mx-1'
          linkClass='text-black'
          activeLinkClass='text-red-500 font-bold'
          innerClass='my-4 flex justify-center'
        />
      )}
    </div>
  )
}

export default CustomPagination
