import React from 'react'

const ContactUs = () => {
  return (
    <main className='align-page min-h-screen'>
      <div className='max-w-4xl mx-auto p-6 bg-white text-gray-700 shadow-md rounded-lg mt-5'>
        <h1 className='text-4xl font-bold mb-4 text-center'>
          İletişim Bilgilerimiz
        </h1>
        <p className='mb-4'>
          Müşteri hizmetleri ekibimiz haftanın 7 günü, 24 saat hizmet
          vermektedir. Ancak bazı özel durumlarda hizmet saatleri değişiklik
          gösterebilir
        </p>
        <h2 className='text-2xl font-semibold mb-2'>Email Adresimiz</h2>
        <ul className='list-disc list-inside mb-4'>
          <li className='list-none'>beybuilmek@gmail.com.</li>
        </ul>
        <h2 className='text-2xl font-semibold mb-2'>Telefon Numaramız</h2>
        <p className='mb-4'>0542 457 14 37</p>
        <h2 className='text-2xl font-semibold mb-2'>Adres Bilgimiz</h2>
        <p className='mb-4'>
          Donanma Mahallesi İlhantuba cad. Gölcük /
          KOCAELİ
        </p>
      </div>
    </main>
  )
}

export default ContactUs
