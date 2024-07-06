
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  // baseQuery: fetchBaseQuery({ 
  //   baseUrl: 'http://localhost:5000/api/v1',
  //   credentials: 'include', // Include credentials (cookies) in requests
  //   }),
    baseQuery: fetchBaseQuery({
  baseUrl:'api/v1',
  credentials: 'include'
}),

    tagTypes: [
    'Products',
    'Product',
    'ALLProducts',
    'FeaturedProduct',
    'AdminProducts',
    'Reviews',
  ],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ((params) => {
        // console.log(params);
        return ({
        url: '/products',
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          seller: params?.seller,
          colors: params?.colors,
          'price[gte]': params.min,
          'price[lte]': params.max,
          'ratings[gte]': params?.ratings,
        },
       
      })}),
      providesTags: ['Products'],
    }),
    getProductsFeatured: builder.query({
      query: () => ({
        url: '/products-featured',
        method: 'GET',
      }),
      providesTags: ['FeaturedProduct'],
    }),
    
    getProductsALL: builder.query({
      query: () => ({
        url: '/products-all',
        method: 'GET',
      }),
       providesTags: ['ALLProducts'],
    }),

    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
     
    }),

    submitReview: builder.mutation({
      query(body) {
        return {
          url: '/reviews',
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Product','Products','ALLProducts'],
    }),

    // user ürünü satın aldıysa yorum yapabilmeli
    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),
    getAdminProducts: builder.query({
      query: () => `/admin/products`,
      providesTags: ['AdminProducts'],
    }),

    createProduct: builder.mutation({
      query(body) {
        return {
          url: '/admin/products',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Product','Products', 'AdminProducts', 'FeaturedProduct'],
    }),

    updateProduct: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Product','Products', 'AdminProducts', 'FeaturedProduct'],
    }),

    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Product','Products', 'AdminProducts', 'FeaturedProduct'], 
    }),

    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_image`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Product','Products', 'AdminProducts', 'FeaturedProduct'],
    }),

    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Product','Products', 'AdminProducts', 'FeaturedProduct'],
    }),

    getProductReviews: builder.query({
      query: (productId) => `/reviews?id=${productId}`,
      providesTags: ['Reviews'],
    }),

    deleteReview: builder.mutation({
      query({ productId, id }) {
        return {
          url: `/admin/reviews?productId=${productId}&id=${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Reviews', 'Product','Products', 'ALLProducts','FeaturedProduct'],
    }),

    updateFeaturedReview: builder.mutation({
      query({ productId, body, reviewID: id }) {
        // console.log("query",productId,body, id );
        return {
          url: `/admin/reviews/featured_update?productId=${productId}&id=${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Reviews', 'Product','Products', 'FeaturedProduct','ALLProducts'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductsFeaturedQuery,
  useGetProductsALLQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useLazyGetProductReviewsQuery, 
  useUpdateFeaturedReviewMutation,
  useDeleteReviewMutation,
} = productApi

