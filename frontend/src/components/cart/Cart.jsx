import React from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { updateCartItem, removeCartItem } from '../../redux/features/cartSlice'
import { FaRegTrashAlt, FaMinus, FaPlus } from 'react-icons/fa'
import { calculateOrderCost } from '../../helpers/helpers'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cartItems } = useSelector((state) => state.cart)

  const { itemsPrice, shippingPrice, totalPrice } =
    calculateOrderCost(cartItems)


  const increseQty = (item, quantity) => {
    const newQty = quantity + 1

    if (newQty > item?.productColorStock) return

    setItemToCart(item, newQty)
  }

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1

    if (newQty <= 0) return

    setItemToCart(item, newQty)
  }

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      colors: item?.colors,
      productColorStock: item?.productColorStock,
      productColorID: item?.productColorID,
      amount: newQty,
      seller: item?.seller,
    }

   

    dispatch(updateCartItem(cartItem)) 
  }

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id))
  }

  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <main className='align-page min-h-screen '>
      <MetaData title={'Sepetim'} />
      {cartItems?.length === 0 ? (
        <div className='flex justify-center items-center mt-5 gap-x-4'>
          <h2 className=' text-red-500 p-2'>Sepetiniz Boş.</h2>
          <Link
            to='/products'
            className=' bg-gray-200 hover:bg-gray-300 rounded-md text-center text-gray-800 p-2 w-20'
          >
            Doldur
          </Link>
        </div>
      ) : (
        <>
          <h1 className='mt-5'>
            Sepetinizde: <b>{cartItems?.length} Ürün var</b>
          </h1>
          <hr />
          {/* section */}
          <div className='flex flex-col mt-5 text-xs sm:text-sm md:text-base '>
            <div className='flex flex-col shadow-md'>
              {cartItems?.map((item, index) => (
                <div key={index}>
                  <div className='flex m-2 px-2 gap-x-1 '>
                    <p className=''>Satıcı:</p>
                    <span className='font-semibold'>{item.seller}</span>
                  </div>

                  {/* product  */}

                  <div className='flex flex-col gap-y-1 px-2'>
                    <div
                      className='flex justify-between px-1 items-start'
                      data-key='product1'
                    >
                      <div>
                        <Link to={`/product/${item?.product}`} className=''>
                          <img
                            className='rounded-sm object-cover w-28 h-24 sm:w-36 sm:h-32'
                            src={item?.image}
                            alt={item?.name}
                          />
                        </Link>
                      </div>
                      <div className='flex'>
                        {/* name */}

                        <div className='flex flex-col gap-y-5 ml-2 sm:ml-0'>
                          <div className='flex gap-x-2'>
                            <p className=' w-32 max-w-40 text-wrap '>
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-x-1'>
                        <p>color:</p>
                        <span
                          className='w-4 h-4 pt-1 rounded-full'
                          style={{ backgroundColor: `${item.colors.color}` }}
                        ></span>
                      </div>
                      {/* price */}
                      <div className=''>
                        <p className='font-bold' id='card_item_price'>
                          ₺{item?.price}
                        </p>
                      </div>
                    </div>
                    {/* buttons join */}
                    <div className='flex justify-center items-center '>
                      <div className='flex ml-16 gap-x-10 mb-4 '>
                        <div className='join join-horizontal  '>
                          <button
                            className='btn join-item bg-gray-300 hover:bg-gray-400'
                            onClick={() => decreseQty(item, item.amount)}
                          >
                            {' '}
                            <span className=''>
                              <FaMinus />
                            </span>
                          </button>

                          <input
                            type='number'
                            className=' join-item w-12 pl-4 text-black   bg-gray-50 '
                            value={item?.amount}
                            readOnly
                          />

                          <button
                            className='btn join-item bg-green-300 hover:bg-green-400'
                            onClick={() => increseQty(item, item.amount)}
                          >
                            {' '}
                            <span className=''>
                              <FaPlus />
                            </span>
                          </button>
                        </div>

                        <button
                          id='delete_cart_item'
                          className='btn bg-red-300 hover:bg-red-500 text-white flex justify-center items-center w-10 '
                          onClick={() =>
                            removeCartItemHandler(item?.productColorID)
                          }
                        >
                          <span className=''>
                            <FaRegTrashAlt style={{ fontSize: '23px' }} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>

            <div className='flex justify-end m-5'>
              <div id='order_summary'>
                <h4>Sipariş Özeti</h4>
                <hr />
                <p>
                  Ürün Adedi:{' '}
                  <span className='order-summary-values'>
                    {cartItems?.reduce((acc, item) => acc + item?.amount, 0)}{' '}
                    (Adet)
                  </span>
                </p>

                <p>
                  Kargo :{' '}
                  <span>
                    ₺{shippingPrice}{' '}
                    <span className='text-red-500'>
                      (t200 ve üzeri kargo bedava)
                    </span>
                  </span>
                </p>
                <p>
                  Ara Toplam:{' '}
                  <span className='order-summary-values'>
                    ₺{itemsPrice}{' '}
                    <span className='text-red-500'>(KDV dahil)</span>
                  </span>
                </p>

                <p>
                  Toplam:{' '}
                  <span className='order-summary-values'>₺{totalPrice} </span>
                </p>
                <hr />
                <button
                  id='checkout_btn'
                  className='btn m-1 text-white bg-green-500 hover:bg-green-600 w-32'
                  onClick={checkoutHandler}
                >
                  Öde
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default Cart
