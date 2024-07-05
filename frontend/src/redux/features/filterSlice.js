import { createSlice } from '@reduxjs/toolkit'

const setUniqueValues = (data, type) => {
  if (data && type) {
    let unique = data.map((item) => item[type])

    if (type === 'colors') {
      unique = unique.flat().map((colorObj) => colorObj.color)
    }

    return [...new Set(unique)]
  }

  return []
}

const initialState = {
  allProductItems: [],
  uniqueCategories: [],
  uniqueSellers: [],
  uniqueColors: [],
  minPrice: '',
  maxPrice: '',
  resetKeyword: false,
  grid_view: true,
  products: [],
  filtered_products: [],
  sort: 'normal',
  checkBoxesCheck: false,
  footerCategory: '',
}

const filterSlice = createSlice({
  initialState,
  name: 'filterSlice',
  reducers: {
    setAllItem: (state, action) => {
      state.allProductItems = action.payload
      state.uniqueCategories = setUniqueValues(action.payload, 'category')
      state.uniqueSellers = setUniqueValues(action.payload, 'seller')
      state.uniqueColors = setUniqueValues(action.payload, 'colors')
    },

    updateSort: (state, action) => {
      state.sort = action.payload
    },
    resetSort: (state) => {
      state.sort = 'normal'
    },

    setFilteredItem: (state, action) => {
      state.filtered_products = action.payload
    },

      setSortedItem: (state) => {
      let temProducts = [...state.filtered_products]

      if (state.sort === 'price-highest') {
        temProducts.sort((a, b) => a.price - b.price)
      } else if (state.sort === 'price-lowest') {
        temProducts.sort((a, b) => b.price - a.price)
      } else if (state.sort === 'name-z') {
        temProducts.sort((a, b) => a.name.localeCompare(b.name))
      } else if (state.sort === 'name-a') {
        temProducts.sort((a, b) => b.name.localeCompare(a.name))
      }

      return {
        ...state,
        products: [...temProducts],
      }
    },

    setResetKeyWordTrue: (state) => {
      state.resetKeyword = true
    },
    setResetKeyWordFalse: (state) => {
      state.resetKeyword = false
    },
    setGridViewTrue: (state) => {
      state.grid_view = true
    },
    setGridViewFalse: (state) => {
      state.grid_view = false
    },
    setFooterCategory: (state, action) => {
      state.footerCategory = action.payload
    },
    removeFooterCategory: (state) => {
      state.footerCategory = ''
    },
    clearCheckBoxesTrue: (state) => {
      state.checkBoxesCheck = true
    },
    clearCheckBoxesFalse: (state) => {
      state.checkBoxesCheck = false
    },
  },
})

export const {
  setAllItem,
  setResetKeyWordTrue,
  setResetKeyWordFalse,
  setGridViewTrue,
  setGridViewFalse,
  setFilteredItem,
  updateSort,
  resetSort,
  setSortedItem,
  setFooterCategory,
  removeFooterCategory,
  clearCheckBoxesTrue,
  clearCheckBoxesFalse,
} = filterSlice.actions

export default filterSlice.reducer

