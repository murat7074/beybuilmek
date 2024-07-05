import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCheckBoxesTrue,
  setResetKeyWordFalse,
} from '../../redux/features/filterSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { pathname } = location

  const { resetKeyword } = useSelector((state) => state.filter)

  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword?.trim()) {
      dispatch(setResetKeyWordFalse())
      dispatch(clearCheckBoxesTrue())
      navigate(`/products?keyword=${keyword}`)
    }
  }

  useEffect(() => {
    if (!keyword && pathname) {
      navigate(pathname)
    }
    if (!keyword && pathname === '/products') {
      dispatch(clearCheckBoxesTrue())
    }
  }, [keyword, pathname])

  useEffect(() => {
    if (resetKeyword) {
      setKeyword('')
    }
  }, [resetKeyword])

  return (
    <form onSubmit={submitHandler} className='w-40 md:w-48'>
      <div className='flex items-center'>
        <input
          type='text'
          aria-describedby='search_btn'
          className='flex h-10 p-4 rounded-l-md border border-r-0 bg-white border-gray-300 w-full'
          placeholder='Ürün İsmi Gir ...'
          name='keyword'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className='group flex h-10 w-10 rounded-r-md bg-orange-400 hover:bg-orange-500 justify-center items-center'
          type='submit'
        >
          <CiSearch className='w-6 h-6 text-white group-hover:scale-105' />
        </button>
      </div>
    </form>
  )
}

export default Search
