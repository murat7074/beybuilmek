import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { IoEyeOutline, IoPrintSharp } from 'react-icons/io5'

import { useEffect, useState } from 'react'

import DebouncedInput from '../utilities/DebouncedInput'

import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { CiSearch } from 'react-icons/ci'
import { debounce } from 'lodash'
import { TbTruckReturn } from 'react-icons/tb'

const FilteredOrders = ({ dataInfo }) => {
  const columnHelper = createColumnHelper()
  const [pageSize, setPageSize] = useState(5)
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
        <span className='text-black hidden md:block'>{info.getValue()}</span>
      ),
      header: <span className='hidden md:block'>Sipariş No</span>,
    }),
    columnHelper.accessor('orderItems', {
      cell: (info) => {
        const items = info?.getValue()
        const defaultImage = 'varsayılan-resim-yolu'
        return (
          <div className='flex flex-wrap gap-1'>
            {items.map((item, index) => (
              <img
                key={index}
                src={item.image || defaultImage}
                alt={`Resim ${index + 1}`}
                className=' w-10 h-10 object-cover'
              />
            ))}
          </div>
        )
      },
      header: 'Ürün',
    }),
    columnHelper.accessor('totalAmount', {
      cell: (info) => (
        <span className='text-black text-xs md:text-base'>
          ₺{info.getValue()}
        </span>
      ),
      header: 'Ödeme',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => {
        const date = new Date(info.getValue()).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        return (
          <span className='text-black hidden md:block text-xs md:text-base'>
            {date}
          </span>
        )
      },
      header: <span className='hidden md:block'>Tarih</span>,
    }),

    columnHelper.accessor('orderStatusAndupdatedAt', {
      cell: (info) => {
        const updatedAt = info?.row.original.updatedAt

        const orderStatus = info?.row.original.orderStatus

        const orderStatusTR =
          orderStatus === 'Processing'
            ? 'Hazırlanıyor'
            : orderStatus === 'Shipped'
            ? 'Kargoda'
            : orderStatus === 'Delivered'
            ? 'Teslim Edildi'
            : orderStatus === 'Returned'
            ? 'İade Edildi'
            : orderStatus === 'Return-Processing'
            ? 'İade Sürecinde'
            : orderStatus === 'Deleted'
            ? 'İptal Edildi'
            : ''

        const date = new Date(updatedAt).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })

        return (
          <div>
            <h3 className='text-black text-xs md:text-base'>{orderStatusTR}</h3>
            <h5 className='text-black text-xs'>{date}</h5>
          </div>
        )
      },
      header: 'Sipariş Durumu',
    }),

    columnHelper.accessor('_idAndorderStatusAndreturnRequest', {
      cell: (info) => {
        const id = info?.row.original._id
        const orderStatus = info?.row.original.orderStatus
        const returnRequest = info?.row.original.returnRequest
        if (orderStatus === 'Deleted') return null
        return (
          <div className='flex gap-x-1'>
            <Link
              to={`/me/order/${id}`}
              className='btn btn-primary  rounded-lg '
            >
              <IoEyeOutline style={{ height: '25px', width: '25px' }} />
            </Link>
            <Link
              to={`/invoice/order/${id}`}
              className='btn btn-success rounded-lg '
            >
              <IoPrintSharp style={{ height: '25px', width: '25px' }} />
            </Link>
            {orderStatus === 'Delivered' && (
              <Link
                to={`/me/order-return/${id}`}
                className='flex flex-col btn gap-0 btn-info rounded-lg '
                disabled={returnRequest === true}
              >
                <span>
                  <TbTruckReturn style={{ height: '20px', width: '20px' }} />{' '}
                </span>
                <span className='text-xs'>İade</span>
              </Link>
            )}
          </div>
        )
      },
      header: 'İşlemler',
    }),
  ]

  const [data, setData] = useState([])

  useEffect(() => {
    if (dataInfo) {
      setData(() => [...dataInfo].reverse())
    }
  }, [dataInfo])

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

  return (
    <div className='p-2 max-w-5xl mx-auto text-white fill-gray-100 '>
      <div className='flex gap-x-20  '>
        <div className='flex justify-between mb-2 '>
          <div className='flex items-center gap-1'>
            <CiSearch
              style={{ width: '30px', height: '30px', color: 'gray' }}
            />
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => {
                setGlobalFilter(String(value))
                setPageIndex(0) // Global filtre değiştiğinde sayfa indeksini sıfırla
              }}
              className='p-2 bg-gray-200 h-8 text-black outline-none rounded-sm border-b-2 w-36 focus:w-44 duration-300 border-indigo-500'
              placeholder='Ara...'
            />
          </div>
        </div>

        <div className='flex justify-center  '>
          <h2 className='p-1 font-bold text-gray-700'>
            {globalFilter
              ? table.getFilteredRowModel().rows.length
              : data?.length}{' '}
            adet sipariş var
          </h2>
        </div>
      </div>

      <table className='border border-gray-700 w-full text-left'>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  )
}

export default FilteredOrders
