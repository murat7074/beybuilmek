import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1',
  //   credentials: 'include', // Include credentials (cookies) in requests
  // }),
  baseQuery: fetchBaseQuery({
  baseUrl:'',
  credentials: 'include'
}),

  tagTypes: ['Order', 'MyOrder', 'AdminOrders', 'User', 'Products'],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: '/orders/new',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Product', 'AdminProducts', 'MyOrder', 'Order'],
    }),

    myOrders: builder.query({
      query: () => `/me/orders`,
      providesTags: ['Order'],
    }),

    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ['MyOrder'],
    }),

    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: '/payment/checkout_session',
          method: 'POST',
          body,
        }
      },
    }),
    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    getAdminOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ['AdminOrders'],
    }),

    updateOrder: builder.mutation({
      query({ id, body }) {
     
        return {
          url: `/admin/orders/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Order', 'AdminOrders', 'MyOrder', 'Products'],
    }),

    returnOrderRequest: builder.mutation({
      query({ id, body }) {
        return {
          url: `/me/order-return/${id}`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Order', 'AdminOrders', 'MyOrder', 'User'],
    }),

    deleteOrder: builder.mutation({
      query({ body, id }) {
      
        return {
          url: `/admin/orders/${id}`,
          method: 'DELETE',
          body,
        }
      },
      invalidatesTags: ['Order', 'AdminOrders', 'MyOrder', 'User'],
    }),
  }),
})

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useLazyGetDashboardSalesQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useReturnOrderRequestMutation,
} = orderApi
