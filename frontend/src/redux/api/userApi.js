import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser, setIsAuthenticated, setLoading } from '../features/userSlice'

export const userApi = createApi({
  reducerPath: 'userApi',
  // baseQuery: fetchBaseQuery({
  //  baseUrl: 'http://localhost:5000/api/v1',
  //   credentials: 'include', // Include credentials (cookies) in requests
  // }),
    baseQuery: fetchBaseQuery({
  baseUrl:'https://fullstack-deneme.onrender.com/api/v1',
  credentials: 'include'
}),

  tagTypes: ['User', 'AdminUsers', 'AdminUser', 'AdminMessages'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user,

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled // data === user
        
          if (data?.isVerified === true) {
            dispatch(setUser(data))
            dispatch(setIsAuthenticated(true))
            dispatch(setLoading(false))
          }
        } catch (error) {
          dispatch(setLoading(false))
          console.log(error)
        }
      },
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: '/me/update',
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['User'],
    }),

    addDeliveryAddressUser: builder.mutation({
      query(body) {
        return {
          url: '/me/add_delivery_address',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['User'],
    }),

    addInvoiceAddressUser: builder.mutation({
      query(body) {
        return {
          url: '/me/add_invoice_address',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['User'],
    }),

    deleteInvoiceUserAddress: builder.mutation({
      query(body) {
        return {
          url: '/me/delete_invoice_address',
          method: 'DELETE',
          body,
        }
      },
      invalidatesTags: ['User'],
    }),

    deleteDeliveryUserAddress: builder.mutation({
      query(body) {
        return {
          url: '/me/delete_delivery_address',
          method: 'DELETE',
          body,
        }
      },
      invalidatesTags: ['User'],
    }),

    getUserMessages: builder.query({
      query: () => `/me/messages`,
    }),

    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: '/me/upload_avatar',
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['User'],
    }),

    updatePassword: builder.mutation({
      query(body) {
        return {
          url: '/password/update',
          method: 'PUT',
          body,
        }
      },
    }),

    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: '/password/forgot',
          method: 'POST',
          body,
        }
      },
    }),

    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: 'PUT',
          body,
        }
      },
    }),

    getAdminUsers: builder.query({
      query: () => `/admin/users`,
      providesTags: ['AdminUsers'],
    }),

    getAdminUserMessages: builder.query({
      query: () => `/admin/messages`,
      providesTags: ['AdminMessages'],
    }),

    reMessageAdmin: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/messages/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['AdminMessages'],
    }),

    getUserDetails: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: ['AdminUser'],
    }),

    updateUser: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/users/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['AdminUsers', 'AdminUser'],
    }),

    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['AdminUsers'],
    }),
  }),
})

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useAddDeliveryAddressUserMutation,
  useAddInvoiceAddressUserMutation,
  useDeleteInvoiceUserAddressMutation,
  useDeleteDeliveryUserAddressMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAdminUsersQuery,
  useGetAdminUserMessagesQuery,
  useGetUserMessagesQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useReMessageAdminMutation,
} = userApi

