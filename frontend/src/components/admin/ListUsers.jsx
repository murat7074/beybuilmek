import React, { useState, useEffect } from 'react'
import Loader from '../layout/Loader'
import { toast } from 'react-hot-toast'

import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import AdminLayout from '../layout/AdminLayout'

import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from '../../redux/api/userApi'
import DeleteDropdownButton from '../utilities/DeleteDropdownButton'

import { MdOutlineVerifiedUser } from 'react-icons/md'
import { VscUnverified } from 'react-icons/vsc'
import { CiEdit } from 'react-icons/ci'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { debounce } from 'lodash'
import { CiSearch } from 'react-icons/ci'
import CustomButtonGroup from '../utilities/CustomButtonGroup'
import DebouncedInput from '../utilities/DebouncedInput'

const ListUsers = () => {
  const [users, setUsers] = useState([])
  const [usersType, setUsersType] = useState('all')

  const columnHelper = createColumnHelper()
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0)
  const [globalFilter, setGlobalFilter] = useState('')

  //   // CLOSE DROPDOWN MENU
  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }
  }

  const filterOrderHandle = (e) => {
    e.preventDefault()
    setUsersType(e.target.name)
    setGlobalFilter('')
  }
  

  const { data, isLoading, error } = useGetAdminUsersQuery()

  const [
    deleteUser,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteUserMutation()

  const filterUsers = (userData, type) => {
   

    let filteredUsers = []

    if (type === 'all') {
      filteredUsers = userData?.filter((user) => user) 
    } else if (type === 'admin') {
      filteredUsers = userData?.filter((user) => user.role === 'admin')
    } else if (type === 'user') {
      filteredUsers = userData?.filter((user) => user.role === 'user')
    }

    setUsers(filteredUsers)
  }

  useEffect(() => {
    if (data?.users) {
      filterUsers([...data.users].reverse(), usersType)
    }
  }, [data, usersType])

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message)
    }

    if (isSuccess) {
      toast.success('Kullanıcı Silindi.')
    }
  }, [error, deleteError, isSuccess])

  const deleteUserHandler = (id) => {
    deleteUser(id)
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
      header: <span className='hidden lg:block'>User No</span>,
    }),
    columnHelper.accessor('avatar', {
      cell: (info) => {
        const avatar = info.getValue()?.url || '/images/default_avatar.jpg'
        return (
          <img
            src={avatar}
            className='hidden md:block h-12 w-12 rounded-full '
          />
        )
      },

      header: <span className='hidden md:block'>Resim</span>,
    }),

    columnHelper.accessor('name', {
      cell: (info) => {
        return <p className='text-black'>{info?.getValue()}</p>
      },
      header: <span className=''>İsim </span>,
    }),

    columnHelper.accessor('isVerified', {
      cell: (info) => {
        const verified = info?.getValue() === true

        if (verified) {
          return (
            <div className='hidden md:flex md:justify-center'>
              <MdOutlineVerifiedUser
                style={{ width: '24px', height: '24px', color: 'green' }}
              />
            </div>
          )
        }

        return (
          <div className='hidden md:flex md:justify-center'>
            <VscUnverified
              style={{ width: '24px', height: '24px', color: 'red' }}
            />
          </div>
        )
      },
      header: <span className='hidden md:block'>Doğrulama </span>,
    }),

    columnHelper.accessor('role', {
      cell: (info) => {
        return <p className='text-black'>{info?.getValue()}</p>
      },
      header: <span className=''>Rol </span>,
    }),
    columnHelper.accessor('email', {
      cell: (info) => {
        return <p className='hidden md:block text-black'>{info?.getValue()}</p>
      },
      header: <span className='hidden md:block'>e-mail </span>,
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

    columnHelper.accessor('_id', {
      cell: (info) => {
        const id = info?.getValue()

        return (
          <div className='flex gap-2 items-center'>
            <Link
              to={`/admin/users/${id}`}
              className='btn hover:scale-105 bg-white '
            >
              <CiEdit
                style={{ width: '20px', height: '20px', color: 'green' }}
              />
            </Link>

            <DeleteDropdownButton
              closeDropdown={closeDropdown}
              id={id}
              deleteHandler={deleteUserHandler}
              isLoading={isDeleteLoading}
            />
          </div>
        )
      },
      header: 'Güncelle',
    }),
  ]

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
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

  const buttonData = [
    { name: 'all', label: 'Hepsi' },
    { name: 'admin', label: 'Admin' },
    { name: 'user', label: 'Kullanıcı' },
  ]

  return (
    <AdminLayout>
      <MetaData title={'Kullanıcılar'} />
      <div className='flex flex-col'>
 
        <CustomButtonGroup
          btnData={buttonData}
          type={usersType}
          btnHandle={filterOrderHandle}
        />

        <div className='p-2 max-w-6xl mx-auto text-white fill-gray-100  '>
          <div className='flex'>
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
                  className='p-2 bg-gray-200 h-8 text-black outline-none rounded-sm border-b-2 w-2/5 focus:w-3/5 duration-300 border-indigo-500'
                  placeholder='Ara...'
                />
              </div>
            </div>

            <div className='flex justify-center p-1'>
              <h2 className='font-bold text-gray-700'>
                {globalFilter
                  ? table.getFilteredRowModel().rows.length
                  : users?.length}{' '}
                adet{' '}
                {usersType === 'all'
                  ? 'admin veya kullanıcı'
                  : usersType === 'admin'
                  ? 'admin'
                  : 'kullanıcı'}{' '}
                var
              </h2>
            </div>
          </div>

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

export default ListUsers
