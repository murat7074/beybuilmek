import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setFooterCategory } from '../../redux/features/filterSlice'
import { PRODUCT_CATEGORIES } from '../../constants/constants'

const Footer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (category) => {
    dispatch(setFooterCategory(category))
    navigate('/products')
  }

  return (
    <footer className='align-page bg-gray-50  mt-10 mb-2 '>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center text-sm md:text-base'>
          <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 p-2 lg:p-4 justify-between gap-y-3 gap-x-20 lg:gap-x-28'>
            <div className='flex flex-col gap-y-1'>
              <h2 className='text-blue-500 '>KURUMSAL</h2>

              <ul className='text-xs md:text-base'>
                <li className='text-gray-700 hover:text-gray-900 hover:scale-105'>
                  <Link to='/about'>Hakkımızda</Link>
                </li>
                <li className='text-gray-700 hover:text-gray-900 hover:scale-105'>
                  <Link to='/customer_service'>Müşteri Hizmetleri</Link>
                </li>
                <li className='text-gray-700 hover:text-gray-900 hover:scale-105'>
                  <Link to='/info_sec_policy'>Bilgi Güvenliği Politikası</Link>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-y-1 '>
              <h2 className='text-blue-500 '>İLETİŞİM</h2>

              <ul className='text-xs md:text-base'>
                <li className='text-gray-700 hover:text-gray-900 hover:scale-105'>
                  <Link to='/contact_us'>Bize Ulaşın</Link>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-y-1'>
              <h2 className='text-blue-500'>KATEGORİLER</h2>

              <ul className='grid xl:grid-cols-2 gap-x-2 text-xs md:text-base'>
                {PRODUCT_CATEGORIES?.map((category, index) => {
                  return (
                    <li
                      key={index}
                      className='text-gray-700 hover:text-gray-900 hover:scale-105 xl:w-36 '
                    >
                      <button onClick={() => handleClick(category)}>
                        {category}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className='flex flex-col gap-y-1 '>
              <h3 className='text-blue-500'>Bizi Takip Edin</h3>

              <div className='flex flex-col gap-y-2 pl-10 '>
                <a
                  className='text-orange-500  hover:text-orange-700 hover:scale-105 '
                  href='https://www.youtube.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaYoutube />
                </a>

                <a
                  className='text-orange-500  hover:text-orange-700 hover:scale-105 '
                  href='https://www.instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram />
                </a>

                <a
                  className='text-orange-500  hover:text-orange-700 hover:scale-105 '
                  href='https://www.twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=' py-2 text-center  text-gray-500'>
          &copy; 2024 Beybuilmek. Bütün Hakları Saklıdır.
        </div>
      </div>
    </footer>
  )
}

export default Footer
