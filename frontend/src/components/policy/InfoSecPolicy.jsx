import React from 'react'

const InfoSecPolicy = () => {
  return (
    <main className='align-page min-h-screen'>
     <div className="max-w-4xl mx-auto p-6 bg-white text-gray-700 shadow-md rounded-lg mt-5">
      <h1 className="text-4xl font-bold mb-4 text-center">Bilgi Güvenliği Politikası</h1>
      <p className="mb-4">
        Bilgi güvenliği, tüm çalışanlarımızın sorumluluğunda olup, bilgilerin gizliliğini,
        bütünlüğünü ve erişilebilirliğini korumak amacıyla gerekli önlemler alınacaktır.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Politika Maddeleri</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Bilgiler sadece yetkili kişiler tarafından erişilebilir olmalıdır.</li>
        <li>Bilgi varlıkları düzenli olarak yedeklenmelidir.</li>
        <li>Güvenlik ihlalleri derhal raporlanmalıdır.</li>
        <li>Çalışanlar düzenli olarak bilgi güvenliği eğitimlerine katılmalıdır.</li>
        <li>Bilgi güvenliği yönetim sistemi sürekli olarak iyileştirilmelidir.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Sorumluluklar</h2>
      <p className="mb-4">
        Tüm çalışanlar, bu politikaya uymak ve bilgi güvenliği ile ilgili riskleri en aza indirmekle sorumludur.
      </p>
      <h2 className="text-2xl font-semibold mb-2">İhlal Durumunda Yapılacaklar</h2>
      <p className="mb-4">
        Herhangi bir bilgi güvenliği ihlali durumunda, derhal bilgi güvenliği ekibine bildirimde bulunulmalı ve gerekli
        önlemler alınmalıdır.
      </p>
    </div>
    </main>
  )
}

export default InfoSecPolicy
