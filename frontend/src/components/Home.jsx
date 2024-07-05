import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsFeaturedQuery } from '../redux/api/productsApi'

import Loader from './layout/Loader'
import toast from 'react-hot-toast'

import { Link } from 'react-router-dom'

import StarRatings from 'react-star-ratings'


const Home = () => {
  const { data, isLoading, error, isError } = useGetProductsFeaturedQuery()

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isError])

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className='align-page min-h-screen'>
      <MetaData
        title={'Ana Sayfa'}
        description={
          'Beybuilmek - Örgü, elişi, bayan çanta, çocuk çanta, çocuk kıyafet ve bebek kıyafetleri. Kaliteli el emeği ürünleri.'
        }
        keywords={
          'örgü, elişi, bayan çanta, çocuk çanta, çocuk kıyafet, bebek kıyafet'
        }
        canonicalUrl={window.location.href}
      />
      <div className='mt-2 p-8 rounded shadow-md grid gap-x-4 gap-y-2 grid-cols-1 lg:grid-cols-2 '>
        <div className='items-center max-w-[650px]'>
          <h1 className='text-2xl font-bold text-blue-600 mb-4'>BEYBUİLMEK</h1>

           <p className='text-sm md:text-base '>
            Örgü ninelerimizden, annelerimizden, halalarımızdan ve
            teyzelerimizden bize kalan bir tutkudur. Çocukken onlardan aldığımız
            bir kazak, hırka vb. bize sadece bir hediye değil eşsiz bir armağan
            aldığımızı hissettirir. Sizlere ve çocuklarınıza bu benzersiz
            duyguyu tekrar hissettirmek ve belkide sadece sizin sahip olucağınız
            ürünler sunmak bizim görevimiz ve misyonumuzdur. Kaliteli el emeği
            ürünlerimiz ile güvenli dijital alışveriş dünyasının keyfini
            çıkarabilirsiniz.
          </p>
        </div>
        

        <div className='max-w-[650px] items-center mx-auto '>
          <img
            src='images/heroFixed.jpg'
            alt='img'
            className='w-[600px] h-96 object-cover rounded-sm'
          />
        </div>
      </div>

      <h3 className='bg-teal-700 uppercase text-center font-bold text-white p-1'>
        Yeni Ürünler
      </h3>
      <hr />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 mt-6'>
        {data?.featuredProducts &&
          [...data.featuredProducts].reverse().map((product) => {
            const { name, description, images, _id, ratings } = product

            const image = images[0].url

            return (
              <div
                key={_id}
                className='card card-compact bg-base-100 shadow-xl md:hover:scale-105'
              >
                <figure>
                  <img
                    // className='w-[450px] h-[400px] object-cover'
                    className='w-[300px] h-[250px]  md:w-[350px] md:h-[270px] object-cover'
                    src={image}
                    alt={name}
                  />




                </figure>
                <div className='card-body mx-auto max-w-80 lg:max-w-[340px] '>
                  <h2 className='flex items-center gap-2 text-lg leading-6 font-medium'>{name}</h2>
                  <p className='text-sm'>{description}</p>
                  <div className='d-flex'>
                    <StarRatings
                      rating={ratings && ratings}
                      starRatedColor='#ffb829'
                      numberOfStars={5}
                      name='rating'
                      starDimension='24px'
                      starSpacing='1px'
                    />
                    <span id='no-of-reviews' className='pt-1 ps-2'>
                      {' '}
                      ({product?.numOfReviews} Yorum){' '}
                    </span>
                  </div>
                  <div className='card-actions justify-center'>
                    <Link
                      to={`/product/${_id}`}
                      className='btn btn-primary btn-sm my-1'
                    >
                      Şimdi Satın Al
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </main>
  )
}

export default Home

