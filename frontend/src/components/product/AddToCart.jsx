import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import AmountButtons from './AmountButtons'
import { setCartItem } from '../../redux/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const AddToCart = ({ product }) => {
  const dispatch = useDispatch()

  const { colors } = product

  const { cartItems } = useSelector((state) => state.cart)

  const [mainColor, setMainColor] = useState(colors?.[0]?.color)

  const [chosenColor, setChosenColor] = useState(colors?.[0])
  const [amount, setAmount] = useState(1)
  const [noAmountColor, setNoAmountColor] = useState(false)

  const limitSameColorStock = cartItems?.find(
    (cartI) => cartI.productColorID === chosenColor.productColorID
  )?.amount

  useEffect(() => {
    let newValue = false

    if (colors && chosenColor) {
      // Renk stoğunu kontrol et (from backend)
      const isOutOfStock = colors.some(
        (item) => item.color === chosenColor.color && chosenColor.colorStock < 1
      )

      if (isOutOfStock) {
        newValue = true
      } else {
        // Renk stoğunu kontrol et (from cart)
        if (
          limitSameColorStock &&
          limitSameColorStock === chosenColor.colorStock
        ) {
          newValue = true
        }
      }
    }

    setNoAmountColor(newValue)
  }, [limitSameColorStock, chosenColor, colors])

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      productColorStock: chosenColor?.colorStock,
      colors: chosenColor,
      productColorID: chosenColor?.productColorID,
      amount,
      seller: product?.seller,
    }

    dispatch(setCartItem(cartItem))
    toast.success('Ürün Sepete Eklendi')
  }

  const setColorProduct = (itemColor) => {
    setNoAmountColor(false)

    setAmount(1)
    setMainColor(itemColor)
    const nevChosenColor = colors?.find((item) => item.color === itemColor)
    setChosenColor(nevChosenColor)
  }

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1

      // limitSameColorStock kontrolü ve atama
      let limCoLStock =
        limitSameColorStock && limitSameColorStock >= 1
          ? limitSameColorStock
          : 0

      // Mevcut stok miktarını kontrol etme
      let maxAmount = chosenColor.colorStock - limCoLStock

      if (tempAmount > maxAmount) {
        if (maxAmount === 0) {
          setNoAmountColor(true)
          tempAmount = 1
        } else {
          tempAmount = maxAmount
        }
      }

      return tempAmount
    })
  }

  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount
    })
  }
  return (
    <div className='relative'>
      {/* colors */}
      <div className='items-center mb-4 md:py-3'>
        <div className=' flex gap-1'>
          {colors.map((color) => {
            return (
              <div key={color.color} className='flex'>
                <button
                  style={{ background: color.color }}
                  className='flex justify-center items-center w-6 h-6 rounded-3xl bg-blue-500 cursor-pointer opacity-100'
                  onClick={() => setColorProduct(color.color)}
                >
                  {mainColor === color.color ? <FaCheck className='' /> : null}
                </button>

                <div className='absolute top-1 right-0  md:top-11 md:left-1 lg:top-10 '>
                  {mainColor === color.color && (
                    <p className='text-wrap text-xs lg:text-base'>
                      Bu renkten{' '}
                      <span className='font-bold'>{color.colorStock}</span> adet
                      ürün bulunmaktadır.
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <hr />

      <div className='flex items-center gap-x-4 mt-3'>
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />

        <Link
          to='/cart'
          className='btn bg-orange-400 hover:bg-orange-600 w-[140px] text-white'
          onClick={setItemToCart}
          disabled={noAmountColor}
        >
          sepete ekle
        </Link>
      </div>
    </div>
  )
}

export default AddToCart
