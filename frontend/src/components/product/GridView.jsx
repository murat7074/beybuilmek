import React from 'react'
import Product from './Product'

const GridView = ({ products }) => {
  return (
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-12 mt-5 px-4 '>
        {products.map((product) => {
          return <Product key={product._id} {...product} />
        })}
      </div>
    </div>
  )
}

export default GridView
