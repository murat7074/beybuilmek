import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({ increase, decrease, amount }) => {
  return (
    <div className='flex items-center gap-2 '>
      <button className='btn  z-50 pointer-events' onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className='shadow-sm px-1 text-xl md:text-2xl font-bold mb-0'>
        {amount}
      </h2>
      <button className='btn' onClick={increase}>
        <FaPlus />
      </button>
    </div>
  )
}

export default AmountButtons
