import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import { Toaster } from 'react-hot-toast'

import useUserRoutes from './components/routes/userRoutes'
import useAdminRoutes from './components/routes/adminRoutes'
import NotFound from './components/layout/NotFound'
import CustomerService from './components/policy/CustomerService'
import InfoSecPolicy from './components/policy/InfoSecPolicy'
import ContactUs from './components/policy/ContactUs'

function App() {
  const userRoutes = useUserRoutes()
  const adminRoutes = useAdminRoutes()

  return (
    <Router>
   
      <div>
        <Toaster position='top-center' />
        <Header />
        <div className='align-page '>
          <div className=' flex  justify-center p-1 bg-red-200'>
            <h1 className='uppercase text-gray-700  '>
              Sitemiz Test Aşamasındadır. Ürünlerimizi İnceleyip Test Alışverişi
              Yapabilirsiniz. <span className='text-blue-500'>Test Kart No: (4242 4242 4242 4242) </span>
            </h1>
           
          </div>
        </div>

        <div>
          <Routes>
            <Route path='/customer_service' element={<CustomerService />} />
            <Route path='/info_sec_policy' element={<InfoSecPolicy />} />
            <Route path='/contact_us' element={<ContactUs />} />

            {userRoutes}
            {adminRoutes}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App

