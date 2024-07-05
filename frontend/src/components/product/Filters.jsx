import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../../helpers/helpers'
import StarRatings from 'react-star-ratings'
import { useSelector, useDispatch } from 'react-redux'
import { CiSearch } from 'react-icons/ci'
import {
  setResetKeyWordTrue,
  resetSort,
  removeFooterCategory,
  clearCheckBoxesFalse,
} from '../../redux/features/filterSlice'
import { useMediaQuery } from 'react-responsive';

const Filters = () => {
  const {
    uniqueCategories,
    uniqueSellers,
    uniqueColors,
    footerCategory,
    checkBoxesCheck,
  } = useSelector((state) => state.filter)

   const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1024px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1025px)' });

    const [responsiveStars, setResponsiveStars] = useState({dmn:"11px",space:"0px"});

  useEffect(() => {
    if (isSmallScreen) {
      setResponsiveStars({dmn:"11px",space:"0px"});
    } else if (isMediumScreen) {
      setResponsiveStars({dmn:"11px",space:"0.5px"});
    } else if (isLargeScreen) {
      setResponsiveStars({dmn:"18px",space:"1px"});
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);


  const dispatch = useDispatch()

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [minPr, setMinPr] = useState(0)
  const [maxPr, setMaxPr] = useState(0)
  const [checkedIndexFlPr, setCheckedIndexFlPr] = useState(null)

  // search yapınca tıklı olanlar kalksın
  useEffect(() => {
    if (checkBoxesCheck === true) {
      setMin(0)
      setMax(0)
      // Filtreleme için kullanılan tüm input öğelerini seç
      const checkboxes = document.querySelectorAll(
        '.filter-content input[type="checkbox"]'
      )
      const textInputs = document.querySelectorAll(
        '.filter-content input[type="text"]'
      )

      // Tüm checkbox'ları seçilmemiş duruma döndür
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })

      // Tüm text input'ları boş duruma döndürün
      textInputs.forEach((input) => {
        input.value = ''
      })

      // Tüm filtreleri temizlerken, checkedIndex state'ini de sıfırla
      setCheckedIndexFlPr(null)
      dispatch(clearCheckBoxesFalse())
    }
  }, [checkBoxesCheck])

  const navigate = useNavigate()

  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    // Min ve Max sorgu parametrelerini kontrol et ve ayarla
    if (searchParams.has('min')) setMin(searchParams.get('min'))
    if (searchParams.has('max')) setMax(searchParams.get('max'))

    // footer dan category e gitme
    if (footerCategory) {
      searchParams.set('category', footerCategory)

      const checkboxes = document.querySelectorAll(`input[name='category']`)
      checkboxes.forEach((checkbox) => {
        checkbox.checked = checkbox.value === footerCategory
      })
      setSearchParams(searchParams)
      dispatch(removeFooterCategory())
    }
  }, [searchParams, footerCategory, setSearchParams, dispatch])

  useEffect(() => {
    searchParams = getPriceQueryParams(searchParams, 'min', minPr)
    searchParams = getPriceQueryParams(searchParams, 'max', maxPr)

    const path = window.location.pathname + '?' + searchParams.toString()
    navigate(path)
  }, [minPr, maxPr])

  // Handle Category & Ratings filter
  const handleClick = (checkbox) => {
    // bütün checkboxes
    const checkboxes = document.getElementsByName(checkbox.name)

    // tıklanmayan false olucak
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
    })

    if (checkbox.checked === false) {
      // Delete filter from query
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name)
        const path = window.location.pathname + '?' + searchParams.toString()
        navigate(path)
      }
    } else {
      // Set new filter value if already there
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value)
      } else {
        // Append new filter
        searchParams.append(checkbox.name, checkbox.value)
      }

      const path = window.location.pathname + '?' + searchParams.toString()

      navigate(path)
    }
  }

  // Handle price filter
  const handleButtonClick = (e) => {
    e.preventDefault()

    setCheckedIndexFlPr(null)

    searchParams = getPriceQueryParams(searchParams, 'min', min)
    searchParams = getPriceQueryParams(searchParams, 'max', max)

    const path = window.location.pathname + '?' + searchParams.toString()
    navigate(path)
  }

  // sayafa refresh olduğunda urlde yazan category i check box da da tıklı olsun istiyoruz
  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType)
    if (checkboxValue === value) return true
    return false
  }

  const clearFilters = () => {
    // Tüm arama parametrelerini temizle
    searchParams = new URLSearchParams()
    setMin(0)
    setMax(0)

    dispatch(setResetKeyWordTrue())
    dispatch(resetSort())

    // Filtreleme için kullanılan tüm input öğelerini seçin
    const checkboxes = document.querySelectorAll(
      '.filter-content input[type="checkbox"]'
    )
    const textInputs = document.querySelectorAll(
      '.filter-content input[type="text"]'
    )

    // Tüm checkbox'ları seçilmemiş duruma döndür
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    // Tüm text input'ları boş duruma döndür
    textInputs.forEach((input) => {
      input.value = ''
    })

    // Tüm filtreleri temizlerken, checkedIndex state'ini de sıfırla
    setCheckedIndexFlPr(null)

    // Sayfayı temizlenmiş arama parametreleriyle yeniden yönlendir
    navigate(window.location.pathname + '?' + searchParams.toString())
  }

  const constantFilterPrices = [
    { id: 1, minPr: 100, maxPr: 400 },
    { id: 2, minPr: 400, maxPr: 900 },
    { id: 3, minPr: 900, maxPr: 1500 },
    { id: 4, minPr: 1500, maxPr: 3000 },
  ]

  const handleFlPr = (index, item) => {
    // Eğer seçilen checkbox'ın index'i mevcut olarak seçili olan checkbox'ın index'i ile eşitse
    // seçimi kaldır ve state'leri sıfırla.
    if (checkedIndexFlPr === index) {
      setCheckedIndexFlPr(null)
      setMin(0)
      setMax(0)
      setMinPr(0)
      setMaxPr(0)
    } else {
      // Aksi takdirde, tıklanan checkbox'ın index'ini set et.
      setCheckedIndexFlPr(index)
      setMin(0)
      setMax(0)
      setMinPr(item.minPr)
      setMaxPr(item.maxPr)
    }
  }

  const handleFocusMin = (e) => {
    // Kullanıcı input alanına odaklandığında min değerini boşaltıyoruz.
    if (e.target.value === '0') {
      setMin('')
    }
  }

  const handleFocusMax = (e) => {
    // Kullanıcı input alanına odaklandığında max değerini boşaltıyoruz.
    if (e.target.value === '0') {
      setMax('')
    }
  }

  return (
    <div className='flex flex-col relative mb-10 text-xs lg:text-base'>
      <div className='h-screen min-w-24 sm:min-w-32 lg:min-w-64 mt-5 overflow-y-auto sticky top-0'>
        <div className='flex flex-col w-full justify-center border p-1 filter-content'>
          <h3 className='text-center font-bold'>Filtrele</h3>
          <hr />
          <div className='absolute top-6 left-2  '>
            <button
              className='btn btn-primary btn-sm  justify-center w-20 lg:w-56 my-4'
              onClick={clearFilters}
            >
              Filtreyi Temizle
            </button>
          </div>
          <div className='flex flex-col lg:ml-4 '>
            <h5 className='filter-heading mb-3 font-bold pt-1 mt-14'>Fiyat</h5>

            <form
              id='filter_form'
              className='relative'
              onSubmit={handleButtonClick}
            >
              <div className='flex flex-col mb-1 gap-y-1 '>
                <div className='flex flex-col gap-1 '>
                  <label className='w-8' htmlFor='minPrice'>
                    min
                  </label>
                  <input
                    type='text'
                    className='form-control rounded-sm w-14 lg:w-28 border-2 pl-1 border-gray-200'
                    id='minPrice'
                    name='min'
                    value={min}
                    onFocus={handleFocusMin}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>

                <div className='flex flex-col gap-1 '>
                  <label className='w-8' htmlFor='maxPrice'>
                    max
                  </label>
                  <input
                    type='text'
                    className='form-control rounded-sm w-14  lg:w-28 border-2 pl-1 border-gray-200'
                    id='maxPrice'
                    name='max'
                    value={max}
                    onFocus={handleFocusMax}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>

              <div className='absolute right-0 top-9  sm:-right-1 lg:sm:top-12 '>
                <button
                  className='group flex h-8 w-7 sm:w-8 lg:w-12 lg:h-12 rounded-md bg-orange-400 hover:bg-orange-500 justify-center items-center'
                  type='submit'
                >
                  <CiSearch className='w- h-6 lg:w-8 lg:h-8  text-white group-hover:scale-105' />
                </button>
              </div>
            </form>
            {/* filtered input prices */}

          <div className='flex flex-col gap-y-1 mb-1'>
              {constantFilterPrices?.map((item, index) => {
              return (
                <div key={item.id} className='form-check flex items-center  '>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='filPr'
                    id={`checkFilPr${index}`}
                    checked={checkedIndexFlPr === index}
                    onChange={() => handleFlPr(index, item)}
                  />
                  <label
                    className='form-check-label ml-1'
                    htmlFor={`checkFilPr${index}`}
                  >
                    {item.minPr} - {item.maxPr}
                  </label>
                </div>
              )
            })}
          </div>
          </div>
          <hr />

          <div className='lg:ml-4'>
            <h5 className='mb-3 font-bold pt-1'>Kategori</h5>

        <div className='flex flex-col  gap-y-1 mb-1 '>
              {uniqueCategories?.map((category, index) => (
              <div key={index} className='form-check flex gap-x-1 items-center'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='category'
                  id={`checkCategory${index}`}
                  value={category}
                  defaultChecked={defaultCheckHandler('category', category)}
                  onClick={(e) => handleClick(e.target)}
                />
                <label
                  className='form-check-label text-[11px] sm:text-sm'
                  htmlFor={`checkCategory${index}`}
                >
                  {' '}
                  {category}
                </label>
              </div>
            ))}
        </div>
          </div>

          <hr />

          <div className='lg:ml-4 '>
            <h5 className='mb-3 font-bold pt-1'>Satıcı</h5>

         <div className='flex flex-col gap-y-1 mb-1'>
             {uniqueSellers?.map((seller, index) => (
              <div key={index} className='form-check flex items-center gap-x-1'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='seller'
                  id={`checkSeller${index}`}
                  value={seller}
                  defaultChecked={defaultCheckHandler('seller', seller)}
                  onClick={(e) => handleClick(e.target)}
                />
                <label
                  className='form-check-label'
                  htmlFor={`checkSeller${index}`}
                >
                  {' '}
                  {seller}
                </label>
              </div>
            ))}
         </div>
          </div>

          <hr />

          <div className='lg:ml-4 '>
            <h5 className='mb-3 font-bold pt-1'>Renkler</h5>

            <div className='flex flex-col h-40 overflow-auto mb-1 '>
              {uniqueColors?.map((colors, index) => (
                <div key={index} className='form-check flex gap-x-2 my-1 '>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='colors'
                    id={`checkColor${index}`}
                    value={colors}
                    defaultChecked={defaultCheckHandler('colors', colors)}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <label
                    className='form-check-label'
                    htmlFor={`checkColor${index}`}
                  >
                    {' '}
                    <span
                      style={{ backgroundColor: `${colors}` }}
                      className='w-4 h-4 lg:w-6 lg:h-6 rounded-full block'
                    ></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className='flex flex-col  lg:ml-4'>
            <h5 className='mb-3 font-bold pt-1'>Değerlendirme</h5>
            <div className='flex flex-col  gap-y-1 mb-1'>
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={index} className='form-check flex items-center '>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='ratings'
                    id={`checkRating${index}`}
                    value={rating}
                    defaultChecked={defaultCheckHandler(
                      'ratings',
                      rating?.toString()
                    )}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <label
                    className='form-check-label ml-1'
                    htmlFor={`checkRating${index}`}
                  >
                    <StarRatings
                      rating={rating}
                      starRatedColor='#ffb829'
                      numberOfStars={5}
                      name='rating'
                      starDimension={responsiveStars.dmn}
                      starSpacing={responsiveStars.space}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='absolute -bottom-14 left-1 lg:left-2 '>
        <button
          className='btn btn-primary btn-sm  justify-center w-20 lg:w-60 text-xs lg:text-base  my-4'
          onClick={clearFilters}
        >
          Filtreyi Temizle
        </button>
      </div>
    </div>
  )
}

export default Filters
