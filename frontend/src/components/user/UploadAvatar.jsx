import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import { useNavigate } from 'react-router-dom'
import { useUploadAvatarMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth)

  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : '/images/default_avatar.jpg'
  )

  const navigate = useNavigate()

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation()

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      toast.success('Avatar Yüklendi')
      navigate('/me/profile')
    }
  }, [error, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      avatar,
    }

    uploadAvatar(userData)
  }

  const onChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
       
        setAvatarPreview(reader.result) 
        setAvatar(reader.result) 
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <UserLayout>
      <MetaData title={'Avatar Yükle'} />

     <div className='max-w-[800px]'>
       <div className='flex justify-center min-h-screen mt-10'>
        <form
          className=' flex flex-col justify-center mt-10 items-center shadow rounded-full gap-y-2 w-32 max-w-96 max-h-96'
          onSubmit={submitHandler}
        >
          <h2 className='mb-4'>Avatar Ekle</h2>

          <div className='flex flex-col justify-center items-center'>
            <div className=''>
              <figure className='avatar  '>
                <img src={avatarPreview} className='rounded-full' alt='image' />
              </figure>
            </div>

            <div className='flex flex-col items-center justify-center mt-1'>
              <label className='cursor-pointer ' htmlFor='customFile'>
                 Avatar Seç
              </label>

              <input
                type='file'
                name='avatar'
                className='flex rounded-md ml-10 '
                id='customFile'
                accept='images/*'
                onChange={onChange}
              />
            </div>
          </div>

          <button
            id='register_button'
            type='submit'
            className='btn btn-secondary w-52 mt-5'
            disabled={isLoading}
          >
            {isLoading ? 'Ekleniyor...' : 'Ekle'}
          </button>
        </form>
      </div>
     </div>
    </UserLayout>
  )
}

export default UploadAvatar
