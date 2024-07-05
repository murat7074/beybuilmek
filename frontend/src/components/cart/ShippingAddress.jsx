import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'



const ShippingAddress = ({ getAddressID }) => {


  const { address } = useSelector((state) => state.auth.user)

  const [activeBtn, setActiveBtn] = useState('delivery_address')
  const [showAddress, setShowAddress] = useState([])

  const choseAddressFunc = (select) => {
    if (select === 'delivery_address') {
      setShowAddress(address.delivery_address)
    } else {
      setShowAddress(address.invoice_address)
    }
  }

  const choseAddressInfo = (e) => {
    
    const clickedButton = e.target.name
    setActiveBtn(clickedButton)
  }

 
  const isActive = (buttonName) => {
    return activeBtn === buttonName
      ? 'btn-primary'
      : 'btn-ghost border-1 border-black'
  }

  useEffect(() => {
    choseAddressFunc(activeBtn)
  }, [address, activeBtn])

  return (
    <>
      <div className='grid grid-cols-2 m-2 gap-y-2 sm:items-center  md:gap-x-2'>
        <button
          name='delivery_address'
          className={`btn ${isActive('delivery_address')}`}
          onClick={choseAddressInfo}
        >
          Teslimat Adreslerim
        </button>
        <button
          name='invoice_address'
          className={`btn ${isActive('invoice_address')}`}
          onClick={choseAddressInfo}
        >
          Fatura Adreslerim
        </button>
      </div>

      {/* mevcut adresle */}
      <div className=' flex flex-col m-2 lg:max-w-[400px] gap-2 '>
        {showAddress && !showAddress.length < 1 ? (
          showAddress.map((item, index) => {
            const { title, address } = item
            return (
              <button
                key={index}
                className='btn btn-ghost border-2 border-gray-100 w-full justify-start'
                onClick={() => getAddressID(item.addressID, activeBtn)}
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='flex flex-col gap-y-1'>
                    <div className='font-bold text-left'>{title}</div>
                    <div className='font-normal w-full '>{address}</div>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className='flex gap-x-2 items-center'>
            <p>
              Gösterilecek Adres Bulunmamaktadır. Yeni Fatura Adresi
              Oluşturabilirsiniz
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default ShippingAddress
