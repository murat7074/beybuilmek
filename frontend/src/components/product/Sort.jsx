import { BsFillGridFill, BsList } from 'react-icons/bs'
import {
  setGridViewFalse,
  setGridViewTrue,
  setSortedItem,
  updateSort,
} from '../../redux/features/filterSlice'
import { useDispatch, useSelector } from 'react-redux'

const Sort = ({ isFilterOn, isProduct }) => {
  const dispatch = useDispatch()

  const { grid_view, sort } = useSelector((state) => state.filter)

  const handleSort = (e) => {
    dispatch(updateSort(e.target.value))
    dispatch(setSortedItem())
  }

  return (
    <>
      <hr />
      <section className=' min-w-[290px] flex gap-x-1  p-1 justify-between items-center'>
        <div className='flex gap-x-4 md:gap-x-6 ml-2 lg:gap-x-8'>
          <button
            className={` ${
              grid_view ? 'bg-blue-500 text-white' : ''
            } text-xl lg:text-2xl rounded-sm`}
            onClick={() => dispatch(setGridViewTrue())}
          >
            <BsFillGridFill />
          </button>
          <button
            className={`${
              !grid_view ? 'bg-blue-500 text-white' : ''
            } text-xl lg:text-2xl rounded-sm`}
            onClick={() => dispatch(setGridViewFalse())}
          >
            <BsList />
          </button>
        </div>

        {isFilterOn ? (
          <div className='bg-red-50 px-4 rounded'>
            <h1
              id='products_heading'
              className='p-1 text-left text-gray-700 text-xs md:text-sm'
            >
              <span className='font-bold mr-1'>{isProduct}</span> Ürün Bulundu.
            </h1>
          </div>
        ) : null}

        <form className='flex flex-col gap-y-1 text-center md:mr-2'>
          <label htmlFor='sort' className=' font-bold text-xs md:text-sm lg:text-lg'>
            Sırala
          </label>
          <select
            name='sort'
            id='sort'
            value={sort}
            onChange={handleSort}
            className='sort-input border-2 text-xs md:text-sm lg:text-lg p-1'
          >
            <option value='normal'>Sırala (Normal)</option>
            <option value='price-lowest'>Fiyat (Düşük)</option>
            <option value='price-highest'>Fiyat (Yüksek)</option>
            <option value='name-a'>İsim (A - Z)</option>
            <option value='name-z'>İsim (Z - A)</option>
          </select>
        </form>
      </section>

      <hr className='mt-2' />
    </>
  )
}

export default Sort
