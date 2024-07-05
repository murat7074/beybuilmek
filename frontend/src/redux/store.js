import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlice'
import productReducer from './features/productSlice'
import filterReducer from './features/filterSlice'
import { productApi } from './api/productsApi'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { orderApi } from './api/orderApi'

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    product: productReducer,
    filter: filterReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware,
    ]),
})
