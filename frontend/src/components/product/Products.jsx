import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  useGetProductsALLQuery,
  useGetProductsQuery,
} from '../../redux/api/productsApi'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import Filters from './Filters'
import CustomPagination from '../layout/CustomPagination'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAllItem,
  setFilteredItem,
  setSortedItem,
} from '../../redux/features/filterSlice'
import Sort from './Sort'
import ListView from './ListView'
import GridView from './GridView'

const Products = () => {
  const { data: allProductData } = useGetProductsALLQuery()
  const { grid_view, products } = useSelector((state) => state.filter)

  const productsReverse = [...products].reverse()

  const dispatch = useDispatch()
  let [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const page = searchParams.get('page') || 1
  const keyword = searchParams.get('keyword') || ''
  const min = searchParams.get('min')
  const max = searchParams.get('max')
  const category = searchParams.get('category')
  const seller = searchParams.get('seller')
  const colors = searchParams.get('colors')
  const ratings = searchParams.get('ratings')

  const params = { page, keyword }
  if (min !== null) params.min = min
  if (max !== null) params.max = max
  if (category !== null) params.category = category
  if (seller !== null) params.seller = seller
  if (colors !== null) params.colors = colors
  if (ratings !== null) params.ratings = ratings

  const { data, isLoading, error, isError } = useGetProductsQuery(params)

  const [isFilterOn, setIsFilterOn] = useState(false)
  const [productsCount, setProductsCount] = useState('')
  const [perPage, setPerPage] = useState('')

  useEffect(() => {
    const hasFilters =
      min !== null ||
      max !== null ||
      category !== null ||
      seller !== null ||
      colors !== null ||
      ratings !== null ||
      keyword !== ''

    setIsFilterOn(hasFilters)

    // pagination safya 1 den fazlaysa da filter işleminde sonuç bulabilsin diye
    if (hasFilters && page !== 1) {
      searchParams.set('page', 1)
      navigate(`${window.location.pathname}?${searchParams.toString()}`)
    }
  }, [min, max, category, seller, colors, ratings, keyword])

  useEffect(() => {
    if (allProductData) {
      dispatch(setAllItem(allProductData.products))
    }
    if (data) {
      dispatch(setFilteredItem(data.products))
      setProductsCount(data?.filteredProductsCount)
      setPerPage(data?.resPerPage)
      dispatch(setSortedItem())
    }

    if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isError, allProductData, data, dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className='align-page min-h-screen'>
      <MetaData
        title='En İyi Ürünleri Al'
        description={
          'Beybuilmek - Örgü, elişi, bayan çanta, çocuk çanta, çocuk kıyafet ve bebek kıyafetleri. Kaliteli el emeği ürünleri.'
        }
        keywords={
          'örgü, elişi, bayan çanta, çocuk çanta, çocuk kıyafet, bebek kıyafet'
        }
        canonicalUrl={window.location.href}
      />
      <div className='flex gap-x-4 mt-0 '>
        <Filters />

        <section id='products-section' className='mt-5 w-full'>
          <Sort isFilterOn={isFilterOn} isProduct={productsReverse?.length} />
          <div className='products flex flex-col mx-2'>
            {grid_view === false ? (
              <ListView products={productsReverse && productsReverse} />
            ) : (
              <GridView products={productsReverse && productsReverse} />
            )}
            <CustomPagination
              resPerPage={perPage}
              filteredProductsCount={productsCount}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default Products
