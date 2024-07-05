import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import { toast } from 'react-hot-toast'

import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import CustomButtonGroup from '../utilities/CustomButtonGroup'
import { BiMessageSquareEdit } from 'react-icons/bi'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { debounce } from 'lodash'

import AdminLayout from '../layout/AdminLayout'
import { useGetAdminUserMessagesQuery } from '../../redux/api/userApi'
import { setAdminMsgIDs } from '../../redux/features/userSlice'

const AdminMessages = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useGetAdminUserMessagesQuery()

  const [retMessages, setRetMessages] = useState([])
  const [messageType, setOrdersType] = useState('Coming')

  const columnHelper = createColumnHelper()
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0)

  const buttonData = [
    { name: 'All', label: 'Bütün Mesajlar' },
    { name: 'Going', label: 'Giden Mesajlar' },
    { name: 'Coming', label: 'Gelen Mesajlar' },
  ]



  const filterOrderHandle = (e) => {
    e.preventDefault()
    setOrdersType(e.target.name)
  }

  

  useEffect(() => {
    let filterData = []

    if (data?.result) {
      filterData = data?.result?.filter((order) => {
        if (messageType === 'All') {
          return true
        } else if (order?.messages) {
          return order.messages.some((item) => {
            if (messageType === 'Going') {
              return item.systemMessages === true
            } else if (messageType === 'Coming') {
              return item.systemMessages === false
            }
            return false
          })
        }

        return false
      })
    }

    setRetMessages([...filterData].reverse())
  }, [data, messageType])

  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => (
        <span className='text-black hidden md:block'>{info.row.index + 1}</span>
      ),
      header: <span className='hidden md:block'>S.No</span>,
    }),
    columnHelper.accessor('order', {
      cell: (info) => (
        <span className='text-black hidden lg:block'>
          {info.getValue()?._id}
        </span>
      ),
      header: <span className='hidden lg:block'>Sipariş No</span>,
    }),
    columnHelper.accessor('order.orderItems', {
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
    columnHelper.accessor('order.totalAmount', {
      cell: (info) => (
        <span className='text-black text-xs md:text-base'>
          ₺{info.getValue()}
        </span>
      ),
      header: 'Fiyat',
    }),
    columnHelper.accessor('messages', {
      cell: (info) => {
        const value = info.getValue()?.map((t) => t.createdAt)
        const date = new Date(value).toLocaleDateString('tr-TR', {
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
      header: <span className='hidden md:block'>Mesaj Tarihi</span>,
    }),

    columnHelper.accessor('messages', {
      cell: (info) => {
        const value = info.getValue()?.map((t) => t.title)

        return <span className='text-black text-xs md:text-base'>{value}</span>
      },
      header: 'Başlık',
    }),

    columnHelper.accessor('messages', {
      cell: (info) => {
        const value = info.getValue()?.map((t) => t.message)

        return <span className='text-black text-xs md:text-base'>{value}</span>
      },
      header: 'Konu',
    }),

    // userid, messageid, order.id

    columnHelper.accessor('messages', {
      cell: (info) => {
        const orderID = info.getValue()?.map((i) => i.orderID)
        const userID = info.getValue()?.map((i) => i.userID)
        const messageID = info.getValue()?.map((i) => i._id)
        const reMessage = info.getValue()?.map((i) => i.reMessage).toLocaleString()
        const systemMessages= info.getValue()?.map((i) => i.systemMessages).toLocaleString()
        


       

        return (
          <div className={`${systemMessages === "true" ? "hidden":"flex"}`}>
            <Link
              to={`/admin/messages/${orderID}`}
              className='btn hover:scale-105 bg-gray-50 hover:bg-gray-100'
              onClick={() => handleMessageID(userID, messageID)}
              disabled={reMessage === "true"}
            >
              <BiMessageSquareEdit
                style={{ width: '25px', height: '25px', color: 'green' }}
              />
            </Link>
          </div>
        )
      },
   header: <span className={`${messageType === "Going" ? "hidden":"flex"}`} >Actions</span>,
    }),
  ]



  const table = useReactTable({
    data: retMessages,
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

  const handleMessageID = (userId, messageId) => {
    const messagesIDs = {
      userID: userId.toLocaleString(),
      messageID: messageId.toLocaleString(),
    }

    dispatch(setAdminMsgIDs(messagesIDs))
  }

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

  // if (error) {
  //   toast.error(error?.data?.message)
  // }

  if (isLoading) {
    return <Loader />
  }

  return (
    <AdminLayout>
      <div className='flex mx-auto'>
        <MetaData title={'Admin Mesajları'} />

        <div className='flex flex-col  items-center'>
          <CustomButtonGroup
            btnData={buttonData}
            type={messageType}
            btnHandle={filterOrderHandle}
          />

          <div className='flex justify-center'>
            <h2 className='p-1 font-bold'>
              {retMessages?.length} adet mesaj var
            </h2>
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
                      className={`${
                        i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                      }`}
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
      </div>
    </AdminLayout>
  )
}

export default AdminMessages
