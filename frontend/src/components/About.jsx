import React from 'react'
import MetaData from './layout/MetaData'

const About = () => {
  return (
    <main className='align-page min-h-screen'>
      <MetaData
        title={'Hakkımızda'}
        description={
          'Beybuilmek - 2024 yılında kurulan bireysel bir girişimcilik firmasıdır.Ev hanımlarımızın harika yeteneklerini sergiliyoruz.'
        }
        keywords={
          'hakkımızda, beybuilmek, ev hanımları, girişimcilik, el işi, kıyafet'
        }
         canonicalUrl={window.location.href} 
      />
      <div>
        <div className='hero bg-base-50'>
          <div className='hero-content flex-col lg:flex-row gap-x-20 mt-5 gap-y-10'>
            <div>
              <h1 className='shadow max-w-[700px] p-1 rounded text-sm md:text-base '>
                <span className='font-bold'> Beybuilmek </span>
                <span>
                  2024 yılında kurulan bireysel bir girişimcilik firmasıdır.
                  Firmamızın ana amacı Türkiye'de yaklaşık 12 milyon ev hanımı
                  için öncü rolü üstlenmektir. Ev hanımlarımızın harika
                  yeteneklerini emsalsiz kıyafetlere dönüştürmelerine olanak
                  sağlamak bizim en önemli misyonumuzdur. Kuruluşundan günümüze
                  süregelen profesyonellik, empati odaklı, dürüstlük ve gelişime
                  açık bakış açımız ile istikrarlı büyüme sergileyerek,
                  e-ticaret dünyasında saygın bir konuma yükselmeye gayret
                  etmekteyiz. Harika kıyafetleriyle gülen yüzler bizim mutluluk
                  kaynağımızdır.
                </span>
              </h1>
            </div>
            <img
              src='images/about.jpg'
              className='w-72 h-96 object-cover rounded-lg shadow-2xl'
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default About

