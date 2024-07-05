import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { FaRegEdit } from 'react-icons/fa'

import { FaPlus } from 'react-icons/fa6'


import AddDeliveryUserAddress from './address/AddDeliveryUserAddress'
import { updateUserAddress } from '../../redux/features/userSlice'

const UserAddress = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

 

  const { address } = useSelector((state) => state.auth.user)



  const [activeBtn, setActiveBtn] = useState('Teslimat Adreslerim')
  const [isNewAddress, setIsNewAddress] = useState(false)
  const [showAddress, setShowAddress] = useState([])

  const choseAddressFunc = (select) => {
    if (select === 'Teslimat Adreslerim') {
      setShowAddress(address.delivery_address)
    } else {
      setShowAddress(address.invoice_address)
    }
  }




  const choseAddressInfo = (e) => {
   
    const clickedButton = e.target.textContent
    setActiveBtn(clickedButton)
  }

 
  const isActive = (buttonName) => {
    return activeBtn === buttonName
      ? 'btn-primary'
      : 'btn-ghost border-1 border-black'
  }


  const addNewAddress = () => {
    setIsNewAddress(true)
  }
  const addInvoiceAddress = () => {
    navigate("/me/add_invoice_address")
  }

  const backToPage = () => {
    setIsNewAddress(false)
  }
  const updateAddress = (editAdd) => {
    const select =
      activeBtn === 'Teslimat Adreslerim'
        ? 'delivery_address'
        : 'invoice_address'
   
    dispatch(updateUserAddress({ editAdd, select: select }))
    navigate("/me/update_address")
  }

  useEffect(() => {
    choseAddressFunc(activeBtn)
  }, [address, activeBtn])

  return (
    <UserLayout>
      <MetaData title={'Kullanıcı Adresi'} />

      <>
        {isNewAddress ? (
          <div className='flex  justify-center items-center'>
            <div className='flex flex-col'>
              <AddDeliveryUserAddress backToPage={backToPage} />
            </div>
          </div>
        ) : (
          <>
            <div className='join grid grid-cols-2 m-2 gap-y-2 sm:items-center md:grid-cols-3 md:gap-x-2'>
              <button
                className={`btn ${isActive('Teslimat Adreslerim')}`}
                onClick={choseAddressInfo}
              >
                Teslimat Adreslerim
              </button>
              <button
                className={`btn ${isActive('Fatura Adreslerim')}`}
                onClick={choseAddressInfo}
              >
                Fatura Adreslerim
              </button>

              <button
                className='btn btn-warning w-full col-span-2 md:col-span-1'
                onClick={addNewAddress}
              >
                <span className='flex flex-row gap-10'>
                  <FaPlus className='font-bold' />{' '}
                  <span className='text-center'>Yeni Teslimat Adresi Ekle</span>
                </span>
              </button>

              <button
                className='btn btn-success w-full col-span-2 md:col-span-1'
                onClick={addInvoiceAddress}
              >
                <span className='flex flex-row gap-10'>
                  <FaPlus className='font-bold' />{' '}
                  <span className='text-center'>Yeni Fatura Adresi Ekle</span>
                </span>
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
                      className='btn btn-ghost border-2 border-black w-full justify-start'
                      onClick={() => updateAddress(item)}
                    >
                      <div className='flex justify-between items-center w-full'>
                        <div className='flex flex-col gap-y-1'>
                          <div className='font-bold text-left'>{title}</div>
                          <div className='font-normal w-full '>{address}</div>
                        </div>
                        <div className='ml-auto'>
                          <FaRegEdit />
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
        )}
      </>
    </UserLayout>
  )
}

export default UserAddress
