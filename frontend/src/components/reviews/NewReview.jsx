import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

import {
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} from '../../redux/api/productsApi'
import { toast } from 'react-hot-toast'

const NewReview = ({ productId }) => {
  const [rating, setRating] = useState(4)
  const [comment, setComment] = useState('')

  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem) {
      elem?.blur()
    }
  }

  const [submitReview, { isLoading, error, isSuccess }] =
    useSubmitReviewMutation()
  const { data } = useCanUserReviewQuery(productId)
  const canReview = data?.canReview

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success(
        'Yorum Gönderildi. Yorumunuz kısa zaman içinde yayınlanacaktır.'
      )
    }
  }, [error, isSuccess])

  const submitHandler = () => {
    const reviewData = { rating, comment, productId }
    submitReview(reviewData)
  }

  const ratingChanged = (event, newRating) => {
    setRating(newRating)
  }

  return (
    <>
      <div className='dropdown lg:dropdown-right  mb-5'>
        {canReview && (
          <div tabIndex={0} role='button' className='btn btn-warning m-1 mt-4'>
            Yorum Yap/Değiştir
          </div>
        )}
        <ul
          tabIndex={0}
          className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box  '
        >
          <div className='min-w-96'>
            <div>
              <h5 className='text-center my-4'>Yorum Yap</h5>
            </div>
            <div className='flex flex-col gap-y-2 bg-gray-50 p-2'>
              <Stack spacing={1}>
                <Rating
                  name='half-rating'
                  value={rating}
                  onChange={ratingChanged}
                  precision={0.5}
                  size='large'
              
                
                />
              </Stack>

              <textarea
                name='review'
                className='form-control mt-4 border-2 w-full pl-1'
                placeholder='Yorum Gir'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button
                className='btn btn-info btn-sm w-full p-1 mt-1'
                aria-label='Close'
                disabled={isLoading}
                onClick={() => {
                  submitHandler()
                  closeDropdown()
                }}
              >
                Gönder
              </button>
            </div>
          </div>
        </ul>
      </div>
    </>
  )
}

export default NewReview


