import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from '../../redux/api/productsApi'
import MetaData from '../layout/MetaData'

import { FaTimes } from 'react-icons/fa'

const UploadImages = () => {
  const fileInputRef = useRef(null)
  const params = useParams()
  const navigate = useNavigate()

  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation()

  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation()

  const { data } = useGetProductDetailsQuery(params?.id)

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images)
    }

    if (error) {
      toast.error(error?.data?.message)
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message)
    }

    if (isSuccess) {
      setImagesPreview([])
      toast.success('Resim Yüklendi')
      navigate('/admin/products')
    }
  }, [data, error, isSuccess, deleteError])

  const onChange = (e) => {
    const files = Array.from(e.target.files)

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result])
          setImages((oldArray) => [...oldArray, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== image)

    setImages(filteredImagesPreview)
    setImagesPreview(filteredImagesPreview)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    uploadProductImages({ id: params?.id, body: { images } })
  }

  const deleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } })
  }

  return (
    <AdminLayout>
      <MetaData title={'ürün Resmi Yükle'} />
      <div className='flex my-5 w-full'>
        <div className='flex flex-col'>
          <form
            className='shadow rounded p-4'
            encType='multipart/form-data'
            onSubmit={submitHandler}
          >
            <h2 className='mb-4 text-center font-bold'>Resim Yükle</h2>

            <div className='mx-1'>
              <label htmlFor='customFile' className='form-label'>
                Resimleri Seç
              </label>

              <div className='min-w-20'>
                <input
                  ref={fileInputRef}
                  type='file'
                  name='product_images'
                  className='form-control'
                  id='customFile'
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>

              {imagesPreview?.length > 0 && (
                <div className='new-images my-2 '>
                  <p className='text-warning'>Seçilen Resimler:</p>

                  <div className='flex flex-wrap gap-2 mt-4 p-1 '>
                    {imagesPreview?.map((img, index) => (
                      <div key={index} className='my-2'>
                        <div className='card gap-y-2'>
                          <img
                            src={img}
                            alt='Card'
                            className='rounded h-32 w-32'
                          />
                          <button
                            type='button'
                            className='btn group w-full  my-1 py-0 bg-red-400 hover:bg-red-500 '
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <div className='group-hover:scale-110'>
                              {' '}
                              <FaTimes
                                style={{ height: '20px', width: '20px' }}
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <hr />
              {/* daha önce yüklü resimler */}
              {uploadedImages?.length > 0 && (
                <div className='uploaded-images my-4'>
                  <p className='text-success'>Yüklü Olan Resimler:</p>
                  <div className='flex flex-wrap gap-2 mt-1 p-1'>
                    {uploadedImages?.map((img, index) => (
                      <div key={index} className='flex my-2'>
                        <div className='card gap-y-2'>
                          <img
                            src={img?.url}
                            alt='Card'
                            className='rounded h-32 w-32'
                          />
                          <button
                            className='btn group w-full  mt-1 py-0 bg-red-400 hover:bg-red-500'
                            type='button'
                            disabled={isLoading || isDeleteLoading}
                            onClick={() => deleteImage(img?.public_id)}
                          >
                            <div className='group-hover:scale-110'>
                              {' '}
                              <FaTimes
                                style={{ height: '20px', width: '20px' }}
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className='flex justify-center'>
              <button
                id='register_button'
                type='submit'
                className='btn bg-green-400 hover:bg-green-600 w-96 py-2 mt-4'
                disabled={isLoading || isDeleteLoading}
              >
                {isLoading ? 'Yükleniyor...' : 'Yükle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default UploadImages
