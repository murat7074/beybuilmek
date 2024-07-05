import React from 'react'
import { Route } from 'react-router-dom'

import ProductDetails from '../product/ProductDetails'
import Login from '../auth/Login'
import Register from '../auth/Register'
import VerifyAccount from '../auth/VerifyAccount'
import Profile from '../user/Profile'
import UpdateProfile from '../user/UpdateProfile'
import ProtectedRoute from '../auth/ProtectedRoute'
import UploadAvatar from '../user/UploadAvatar'
import UpdatePassword from '../user/UpdatePassword'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'
import Cart from '../cart/Cart'
import Shipping from '../cart/Shipping'
import ConfirmOrder from '../cart/ConfirmOrder'
import PaymentMethod from '../cart/PaymentMethod'
import MyOrders from '../order/MyOrders'
import OrderDetails from '../order/OrderDetails'
import Invoice from '../invoice/Invoice'
import Home from '../Home'
import UserAddress from '../user/UserAddress'
import AddDeliveryUserAddress from '../user/address/AddDeliveryUserAddress'
import AddInvoiceAddressForm from '../user/address/AddInvoiceAddressForm'
import UpdateAddressForm from '../user/address/UpdateAddressForm'
import ShippingInvoiceAddress from '../cart/ShippingInvoiceAddress'
import Products from '../product/Products'
import About from '../About'
import ReturnOrder from '../order/ReturnOrder'
import Messages from '../user/Messages'
import Checkout from '../Checkout'
import Support from '../Support'
import StripeSuccess from '../order/StripeSuccess'

const userRoutes = () => {
  return (
    <>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/about' element={<About />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/support' element={<Support />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-email' element={<VerifyAccount />} />

      <Route path='/password/forgot' element={<ForgotPassword />} />
      <Route path='/password/reset/:token' element={<ResetPassword />} />

      <Route
        path='/me/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path='/me/update_profile'
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/me/user_address'
        element={
          <ProtectedRoute>
            <UserAddress />
          </ProtectedRoute>
        }
      />
      <Route
        path='/me/add_address'
        element={
          <ProtectedRoute>
            <AddDeliveryUserAddress />
          </ProtectedRoute>
        }
      />
      <Route
        path='/me/add_invoice_address'
        element={
          <ProtectedRoute>
            <AddInvoiceAddressForm />
          </ProtectedRoute>
        }
      />
      <Route
        path='/me/update_address'
        element={
          <ProtectedRoute>
            <UpdateAddressForm />
          </ProtectedRoute>
        }
      />

      <Route
        path='/me/upload_avatar'
        element={
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        }
      />

      <Route
        path='/me/update_password'
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />

      <Route path='/cart' element={<Cart />} />
      <Route
        path='/shipping'
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path='/shipping_invoice_address'
        element={
          <ProtectedRoute>
            <ShippingInvoiceAddress />
          </ProtectedRoute>
        }
      />
      <Route
        path='/confirm_order'
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path='/payment_method'
        element={
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        }
      />

      <Route
        path='/me/messages'
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path='/me/orders'
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path='/me/orders/stripe-success'
        element={
          <ProtectedRoute>
            <StripeSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path='/me/order/:id'
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path='/me/order-return/:id'
        element={
          <ProtectedRoute>
            <ReturnOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path='/invoice/order/:id'
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
    </>
  )
}

export default userRoutes
