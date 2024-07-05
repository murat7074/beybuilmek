
import { FaRegUser,FaUserEdit,FaUserCircle,FaLock  } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";

export const profileLinks = [
  
    {
      id:1,
      text: 'Profil',
      url: '/me/profile',
      Icon: FaRegUser ,
    },
    {
      id:2,
      text: 'Profil Güncelle ',
      url: '/me/update_profile',
      Icon: FaUserEdit ,
    },
    {
      id:3,
      text: 'Avatar Yükle',
      url: '/me/upload_avatar',
      Icon: FaUserCircle ,
    },
    {
      id:4,
      text: 'Şifre Değiştir',
      url: '/me/update_password',
      Icon: FaLock ,
    },
    {
      id:5,
      text: 'Adres',
      url: '/me/user_address',
      Icon: FaRegAddressCard ,
    },
  ]