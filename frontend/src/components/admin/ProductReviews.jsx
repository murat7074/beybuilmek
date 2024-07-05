import React, { useState, useEffect } from 'react'
import Loader from '../layout/Loader'
import { toast } from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import { FaExchangeAlt } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import AdminLayout from '../layout/AdminLayout'
import {
  useDeleteReviewMutation,
  useUpdateFeaturedReviewMutation,
  useGetProductsALLQuery,
} from '../../redux/api/productsApi'


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { debounce } from 'lodash'

const ProductReviews = () => {
  const [reviewsData, setReviewsData] = useState([])
  const [reviewsType, setReviewsType] = useState('unverified')

  const columnHelper = createColumnHelper()
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0)

  //   // CLOSE DROPDOWN MENU
  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }
  }


  const { data: allProductData, isLoading, error } = useGetProductsALLQuery()


  const filterRevs = (rewData, type) => {
    const filterReviews = (review, isFeatured) =>
      review.reviews
        .filter((unv) => unv.featured === isFeatured)
        .map((unv) => ({
          ...unv,
          productImages: review.images,
          productName: review.name,
          productID: review.productID,
        }))

    let filteredReviews = []

    if (type === 'all') {
      filteredReviews = rewData
        ?.filter((review) => review)
        .flatMap((review) => [
          ...filterReviews(review, true),
          ...filterReviews(review, false),
        ])
    } else if (type === 'verify') {
      filteredReviews = rewData
        ?.filter((review) => review)
        .flatMap((review) => filterReviews(review, true))
    } else if (type === 'unverified') {
      filteredReviews = rewData
        ?.filter((review) => review)
        .flatMap((review) => filterReviews(review, false))
    }

    setReviewsData(filteredReviews)
  }

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation()
  const [
    updateFeaturedReview,
    {
      error: changeFeaturedError,
      isLoading: changeFeaturedLoading,
      isSuccess: changeFeaturedIsSuccess,
    },
  ] = useUpdateFeaturedReviewMutation()

  useEffect(() => {
    if (allProductData) {
      const newData = allProductData.products.map((data) => {
        const image = data.images?.[0]?.url
        return {
          reviews: data.reviews,
          name: data.name,
          images: image,
          productID: data._id,
        }
      })

      filterRevs([...newData].reverse(), reviewsType)
    }
  }, [allProductData, reviewsType])

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
    if (changeFeaturedError) {
      toast.error(changeFeaturedError?.data?.message)
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message)
    }
    if (isSuccess) {
      toast.success('Yorum Silindi')
    }
    if (changeFeaturedIsSuccess) {
      toast.success('Yorum Onayı Değiştirildi.')
    }
  }, [
    error,
    deleteError,
    isSuccess,
    changeFeaturedError,
    changeFeaturedIsSuccess,
  ])

  const deleteReviewHandler = (e, id, productId) => {
    e.preventDefault()
    deleteReview({ productId, id })
  }

  const changeFeaturedHandle = (e, reviewID, productId) => {
    e.preventDefault()
    const changedFeaturedReview = reviewsData.find(
      (item) => item._id === reviewID
    )
    updateFeaturedReview({ productId, body: changedFeaturedReview, reviewID })
  }

  const onChangeFeatured = (e, reviewID) => {
    const newFeaturedValue = e.target.value === 'true'
    const updatedReviewsData = reviewsData.map((review) => {
      if (review._id === reviewID) {
        return {
          ...review,
          featured: newFeaturedValue,
        }
      }
      return review
    })
    setReviewsData(updatedReviewsData)
  }

  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => (
        <span className='text-black hidden lg:block'>{info.row.index + 1}</span>
      ),
      header: <span className='hidden lg:block'>S.No</span>,
    }),
    columnHelper.accessor('_id', {
      cell: (info) => (
        <span className='text-black text-xs hidden lg:block'>
          {info.getValue()}
        </span>
      ),
      header: <span className='hidden lg:block'>Yorum No</span>,
    }),
    columnHelper.accessor('productImages', {
      cell: (info) => (
        <div className='text-black text-xs '>
          <img src={info.getValue()} alt='Resim' className='w-12 h-12' />
        </div>
      ),
      header: <span className=''>Resim</span>,
    }),

    columnHelper.accessor('productName', {
      cell: (info) => {
      

        return <p className='hidden lg:block text-black'>{info?.getValue()}</p>
      },
      header: <span className='hidden lg:block'>Ürün Adı</span>,
    }),

    columnHelper.accessor('rating', {
      cell: (info) => {
        return <p className='hidden lg:block text-black'>{info.getValue()}</p>
      },
      header: <span className='hidden lg:block'>Reyting</span>,
    }),

    columnHelper.accessor('createdAt', {
      cell: (info) => {
        const date = new Date(info.getValue()).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        return <span className='text-black hidden lg:block  '>{date}</span>
      },
      header: <span className='hidden lg:block'>Tarih</span>,
    }),

    columnHelper.accessor('comment', {
      cell: (info) => {
        return <p className='text-black'>{info.getValue()}</p>
      },
      header: 'Yorum',
    }),

    columnHelper.accessor('featuredAnd_idAndproductID', {
      cell: (info) => {
        const feature = info?.row.original.featured
        const id = info?.row.original._id
        const productId = info?.row.original.productID

        return (
          <div className='flex gap-2 items-center'>
            <select
              className='select border-2 border-gray-200 select-sm max-w-xs text-black bg-gray-50'
              id='featured'
              name='featured'
              value={feature}
              onChange={(e) => onChangeFeatured(e, id)}
            >
              <option value='false'>false</option>
              <option value='true'>true</option>
            </select>

            <button
              className='btn text-sm'
              disabled={changeFeaturedLoading}
              onClick={(e) => changeFeaturedHandle(e, id, productId)}
            >
              <FaExchangeAlt style={{ width: '14px', height: '14px' }} />
            </button>

            <div className='dropdown dropdown-top'>
              <div tabIndex={0} role='button' className='btn hover:scale-105'>
                <FaTrashAlt
                  style={{ width: '20px', height: '20px', color: 'red' }}
                />
              </div>

              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box  right-2 top-2'
              >
                <li>
                  <p className='text-gray-500'>Veri silinecek eminmisiniz???</p>
                </li>
                <ul className='flex flex-row gap-x-2' onClick={closeDropdown}>
                  <li>
                    <button
                      className='btn btn-error btn-sm text-black'
                      onClick={(e) => deleteReviewHandler(e, id, productId)}
                      disabled={isDeleteLoading}
                    >
                      Evet
                    </button>
                  </li>
                  <li>
                    <button className='btn btn-info btn-sm text-black'>
                      Hayır
                    </button>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        )
      },
      header: 'Yorum Onay',
    }),
  ]

  const table = useReactTable({
    data: reviewsData,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const delayedOnChange = debounce((e) => {
    const value = e.target.value.trim()
    const page = parseInt(value)
    if (value === '') {
      setPageIndex(pageIndex)
    } else if (isNaN(page) || page < 1 || page > table.getPageCount()) {
      toast.error('Geçerli bir sayfa numarası girin.')
      e.target.value = ''
    } else {
      setPageIndex(page - 1)
    }
  }, 500)

  if (isLoading) return <Loader />

  return (
    <AdminLayout>
      <MetaData title={'Yorum Onay'} />

      <div className='flex flex-col'>
        <div className='flex md:justify-center items-center gap-x-10 my-2 px-2'>
          <button
            className={`btn min-w-20 border-2 border-gray-200 ${
              reviewsType === 'all' ? 'scale-110 border-red-500' : ''
            }`}
            name='all'
            onClick={() => setReviewsType('all')}
          >
            Hepsi
          </button>
          <button
            className={`btn min-w-20 bg-red-300 hover:bg-red-400 ${
              reviewsType === 'unverified'
                ? ' border-2 scale-110 border-red-500'
                : ''
            }`}
            name='unverified'
            onClick={() => setReviewsType('unverified')}
          >
            Onaylanmamış Yorumlar
          </button>
          <button
            className={`btn min-w-20 bg-green-300 hover:bg-green-400 ${
              reviewsType === 'verify'
                ? ' border-2 scale-110 border-red-500'
                : ''
            }`}
            name='verify'
            onClick={() => setReviewsType('verify')}
          >
            Onaylanmış Yorumlar
          </button>
        </div>
        <div className='flex justify-center'>
          <h2 className='font-bold'>{reviewsData?.length} adet yorum var</h2>
        </div>

        <div className='p-2 max-w-5xl mx-auto text-white fill-gray-100  '>
          <table className='border border-gray-700 w-full text-left '>
            <thead className='bg-indigo-600'>
              {table.getHeaderGroups().map((headerGroup, index) => (
                <tr key={index}>
                  {headerGroup.headers.map((header, index) => (
                    <th key={index} className='capitalize px-3.5 py-2'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`${i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <td key={index} className='px-3.5 py-2'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className='text-black text-center h-32'>
                  <td colSpan={12}>Kayıt Bulunamadı!</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='flex items-center justify-end mt-2 gap-2 bg-white'>
            <button
              onClick={() => setPageIndex((prev) => prev - 1)}
              disabled={!table.getCanPreviousPage()}
              className='p-1 border text-black font-bold border-gray-300 px-2 disabled:opacity-40'
            >
              {'<'}
            </button>
            <button
              onClick={() => setPageIndex((prev) => prev + 1)}
              disabled={!table.getCanNextPage()}
              className='p-1 border text-black font-bold border-gray-300 px-2 disabled:opacity-40'
            >
              {'>'}
            </button>
            <span className='flex text-black items-center gap-1'>
              <div>Sayfa</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} ➡️{' '}
                {table.getPageCount()}
              </strong>
            </span>
            <span className='flex text-black items-center gap-1'>
              | Sayfaya Git:
              <input
                type='number'
                min={1}
                max={table.getPageCount()}
                defaultValue={pageIndex + 1}
                onChange={(e) => delayedOnChange(e)}
                className='border p-1 text-center rounded w-16 bg-transparent'
              />
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value)
                setPageSize(newSize)
                table.setPageSize(newSize)
              }}
              className='p-2 text-black bg-transparent'
            >
              {[5, 10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Göster {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ProductReviews
