import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  colors: [],
}

export const productSlice = createSlice({
  initialState,
  name: 'productSlice',
  reducers: {
    setProductItemForUpdate: (state, action) => {
      state.colors = action.payload
    },

    addColorItem: (state, action) => {
      state.colors = [...state.colors, action.payload]
    },

    removeColorItem: (state, action) => {
      const { color } = action.payload
      state.colors = state.colors.filter((item) => item.color !== color)
    },

    changeStockForColorItem: (state, action) => {
      const { color, colorStock } = action.payload

      // Find the correct item in state.changeProduct.colors and update its colorStock
      state.colors = state.colors.map((item) => {
        if (item.color === color) {
          return { ...item, colorStock: colorStock }
        }
        return item
      })
    },
  },
})

export default productSlice.reducer

export const {
  setProductItemForUpdate,
  addColorItem,
  removeColorItem,
  changeStockForColorItem,
} = productSlice.actions

