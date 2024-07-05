import React, { useEffect, useState } from 'react'
import Loader from '../layout/Loader'
import { toast } from 'react-hot-toast'

import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from '../../redux/api/productsApi'
import AdminLayout from '../layout/AdminLayout'



import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { CiEdit } from 'react-icons/ci'

import DebouncedInput from '../utilities/DebouncedInput'

import { CiSearch } from 'react-icons/ci'
import { ImFilePicture } from 'react-icons/im'
import { debounce } from 'lodash'
import DeleteDropdownButton from '../utilities/DeleteDropdownButton'

const ListProducts = () => {
  // CLOSE DROPDOWN MENU
  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }
  }


  
  const { data: productsData, isLoading, error } = useGetAdminProductsQuery()



  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation()

  const columnHelper = createColumnHelper()
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [globalFilter, setGlobalFilter] = useState('')



  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => (
        <span className='text-black hidden md:block'>{info.row.index + 1}</span>
      ),
      header: <span className='hidden md:block'>S.No</span>,
    }),
    columnHelper.accessor('_id', {
      cell: (info) => (
        <span className='text-black text-xs hidden lg:block'>
          {info.getValue()}
        </span>
      ),
      header: <span className='hidden lg:block'>Ürün No</span>,
    }),
    columnHelper.accessor('images', {
      cell: (info) => {
        const img = info?.getValue()
        const image = img?.[0]?.url
        const defaultImage = 'varsayılan-resim-yolu'

        return (
          <div className='flex flex-wrap gap-1'>
            <img
              src={image || defaultImage}
              alt='resim'
              className=' w-10 h-10 object-cover'
            />
          </div>
        )
      },
      header: 'Resim',
    }),

    columnHelper.accessor('name', {
      cell: (info) => <span className='text-black '>{info.getValue()}</span>,
      header: <span className=''>İsim</span>,
    }),
    columnHelper.accessor('price', {
      cell: (info) => (
        <span className='hidden md:block text-black text-xs md:text-base'>
          ₺{info.getValue()}
        </span>
      ),
      header: <span className='hidden md:block'>Fiyat</span>,
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


    columnHelper.accessor('stock', {
      cell: (info) => (
        <span className='text-black text-xs md:text-base'>
          {info.getValue()}
        </span>
      ),
      header: 'Stok',
    }),

    columnHelper.accessor('_id', {
      cell: (info) => {
        const id = info.getValue()
        return (
          <div className='flex flex-wrap min-w-20 md:min-w-44 lg:min-w-60  items-center sm:flex-row gap-1  '>
            <Link to={`/admin/products/${id}`} className='btn hover:scale-105 '>
              <CiEdit style={{ width: '20px', height: '20px' }} />
            </Link>
            <Link
              to={`/admin/products/${id}/upload_images`}
              className='btn hover:scale-105 '
            >
              <ImFilePicture
                style={{ width: '20px', height: '20px', color: 'green' }}
              />
            </Link>

            <DeleteDropdownButton
              closeDropdown={closeDropdown}
              id={id}
              deleteHandler={deleteProductHandler}
              isLoading={isDeleteLoading}
            />

            <Link
              to={`/admin/reviews/${id}`}
              className='btn bg-green-300 w-16 h-10 border text-xs border-black'
            >
              yorumlara git
            </Link>
          </div>
        )
      },
      header: 'İşlemler',
    }),
  ]

  const [data, setData] = useState([])

  useEffect(() => {
    if (productsData) {
      setData(() => [...productsData.products].reverse())
    }
  }, [productsData])



  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
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

  const deleteProductHandler = (id) => {
    deleteProduct(id)
  }

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message)
    }

    if (isSuccess) {
      toast.success('Ürün Silindi.')
    }
  }, [error, deleteError, isSuccess])

  if (isLoading) return <Loader />

  return (
    <AdminLayout>
      <MetaData title={'Ürünler'} />

      <div className=' flex flex-col'>
        <h1 className='text-center'>
          Toplam <span className='font-bold'>{globalFilter
                ? table.getFilteredRowModel().rows.length
              :data?.length}</span> Ürün
        </h1>

        <div className='p-2 max-w-5xl mx-auto text-white fill-gray-100 '>
          <div className='flex justify-between mb-2 '>
            <div className='w-full flex items-center gap-1'>
              <CiSearch
                style={{ width: '30px', height: '30px', color: 'gray' }}
              />
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => {
                  setGlobalFilter(String(value))
                  setPageIndex(0) // Global filtre değiştiğinde sayfa indeksini sıfırla
                }}
                className='p-2 bg-gray-200 h-8 text-black outline-none rounded-sm border-b-2 w-20 focus:w-36 duration-300 border-indigo-500'
                placeholder='Ara...'
              />
            </div>
          </div>
          <table className='border border-gray-700 w-full text-left  '>
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

export default ListProducts
