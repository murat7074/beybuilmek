import { LiaTachometerAltSolid } from 'react-icons/lia'
import { FaPlus, FaRegUser } from 'react-icons/fa'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { IoReceiptOutline } from 'react-icons/io5'
import { IoIosStarOutline } from 'react-icons/io'
import { BiMessageDetail } from "react-icons/bi";

export const adminLinks = [
  {
    id: 1,
    text: 'Dashboard',
    url: '/admin/dashboard',
    Icon: LiaTachometerAltSolid,
  },

  {
    id: 2,
    text: 'Ürün Ekle',
    url: '/admin/product/new',
    Icon: FaPlus,
  },
  {
    id: 3,
    text: 'Ürünler',
    url: '/admin/products',
    Icon: MdProductionQuantityLimits,
  },
  {
    id: 4,
    text: 'Siparişler',
    url: '/admin/orders',
    Icon: IoReceiptOutline,
  },
  {
    id: 5,
    text: 'Kullanıcılar',
    url: '/admin/users',
    Icon: FaRegUser,
  },
  {
    id: 6,
    text: 'Yorumlar',
    url: '/admin/reviews',
    Icon: IoIosStarOutline,
  },
  {
    id: 7,
    text: 'Mesajlar',
    url: '/admin/messages',
    Icon: BiMessageDetail,
  },
]
