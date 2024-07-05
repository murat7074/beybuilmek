import { createSlice } from '@reduxjs/toolkit'

const themes = {
  winter: 'winter',
  dracula: 'dracula',
}

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  updateDeliveryAddress: {},
  updateInvoiceAddress: {},
  selectAdd: '',
  theme: getThemeFromLocalStorage(),
  returnAdminMsgIDs:{}
 
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    updateUserAddress(state, action) {
      const { select, editAdd } = action.payload
      // console.log(select, editAdd)

      state.selectAdd = select

      if (select === 'delivery_address') {
        state.updateDeliveryAddress = editAdd
      } else {
        state.updateInvoiceAddress = editAdd
      }
    },
    resetUpdateAddress(state, action) {
      state.updateDeliveryAddress = {}
      state.updateInvoiceAddress = {}
      state.selectAdd = ''
    },

    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  
    setAdminMsgIDs(state, action) {
      state.returnAdminMsgIDs = action.payload
    },
  
    toggleTheme: (state) => {
      const { dracula, winter } = themes
      state.theme = state.theme === dracula ? winter : dracula
      document.documentElement.setAttribute('data-theme', state.theme)
   
      localStorage.setItem('theme', state.theme)
    },
  },
})

export default userSlice.reducer

export const {
  setIsAuthenticated,
  setUser,
  setLoading,
  updateUserAddress,
  resetUpdateAddress,
  toggleTheme,
  setAdminMsgIDs,

} = userSlice.actions
