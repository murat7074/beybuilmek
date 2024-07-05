import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],

  shippingInfo: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {},
  shippingInvoiceInfo: localStorage.getItem('shippingInvoiceInfo')
    ? JSON.parse(localStorage.getItem('shippingInvoiceInfo'))
    : {},
}

export const cartSlice = createSlice({
  initialState,
  name: 'cartSlice',
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload

      /* aynı renkte miktar artmalı */
      const isItemExist = state.cartItems.find(
        (i) => i.productColorID === item.productColorID
      )

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.productColorID === isItemExist.productColorID
            ? { ...i, amount: i.amount + item.amount }
            : i
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    updateCartItem: (state, action) => {
      const item = action.payload

      // State'i güncelleme işlemi
      state.cartItems = state.cartItems.map((i) => {
        if (i.productColorID === item.productColorID) {
          // Ürün miktarını güncelle
          return { ...i, amount: item.amount }
        }
        // Eşleşme yoksa orijinal öğeyi döndür
        return i
      })

      // Local storage güncelleme
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeCartItem: (state, action) => {
      state.cartItems = state?.cartItems?.filter(
        (i) => i.productColorID !== action.payload
      )

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeStockOutItemFromCart: (state, action) => {
      const productColorIDsToRemove = action.payload.map(
        (item) => item.productColorID
      )
      state.cartItems = state.cartItems.filter(
        (i) => !productColorIDsToRemove.includes(i.productColorID)
      )

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    clearCart: (state, action) => {
      localStorage.removeItem('cartItems')
      state.cartItems = []
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload

      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
    },
    saveShippingInvoiceInfo: (state, action) => {
      state.shippingInvoiceInfo = action.payload

      localStorage.setItem(
        'shippingInvoiceInfo',
        JSON.stringify(state.shippingInfo)
      )
    },
  },
})

export default cartSlice.reducer

export const {
  setCartItem,
  removeCartItem,
  saveShippingInfo,
  saveShippingInvoiceInfo,
  clearCart,
  updateCartItem,
  removeStockOutItemFromCart,
} = cartSlice.actions
