import React from 'react'

const CustomerService = () => {
  return (
    <main className='align-page min-h-screen'>
      <div className='max-w-4xl mx-auto bg-white p-8 shadow-lg mt-5 text-gray-800'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Müşteri Hizmeti Politikası
        </h1>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>Giriş</h2>
          <p>
            Müşteri memnuniyeti, şirketimizin en önemli önceliklerinden biridir.
            Bu politika, müşteri hizmetlerimizi en yüksek standartlara çıkarmak
            için izlediğimiz kuralları ve prosedürleri özetlemektedir.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>İletişim</h2>
          <p>
            Müşterilerimiz, herhangi bir soruları veya endişeleri olduğunda
            bizimle iletişime geçebilirler. Müşteri hizmetleri ekibimize
            aşağıdaki yöntemlerle ulaşabilirsiniz:
          </p>
          <ul className='list-disc list-inside ml-4'>
            <li>Telefon: +90 542 457 14 37</li>
            <li>Email: destek-beybuilmek@gmail.com</li>
            <li>Canlı Sohbet: Web sitemiz üzerinden</li>
          </ul>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>Hizmet Saatleri</h2>
          <p>
            Müşteri hizmetleri ekibimiz haftanın 7 günü, 24 saat hizmet
            vermektedir. Ancak bazı özel durumlarda hizmet saatleri değişiklik
            gösterebilir.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>Geri Bildirim</h2>
          <p>
            Müşterilerimizin geri bildirimlerini önemsiyoruz. Lütfen
            deneyiminizi bize bildirin ve hizmetlerimizi nasıl
            geliştirebileceğimizi paylaşın.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-2'>Şikayetler</h2>
          <p>
            Şikayetlerinizi ciddiyetle ele alıyoruz ve mümkün olan en kısa
            sürede çözüm sunmak için çalışıyoruz. Şikayetlerinizi yukarıdaki
            iletişim bilgilerini kullanarak bize iletebilirsiniz.
          </p>
        </section>
      </div>
    </main>
  )
}

export default CustomerService
