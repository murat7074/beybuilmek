import { FaTrashAlt } from 'react-icons/fa'

const DeleteDropdownButton = ({closeDropdown,data,id,deleteHandler,isLoading}) => {
  return (
    <div className='dropdown dropdown-bottom'>
              <div tabIndex={0} role='button' className='btn hover:scale-105'>
              
                  <FaTrashAlt style={{width:"20px",height:"20px",color:"red"}} />
               
              </div>

              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box right-2 top-2 '
              >
                <li>
                  <p className='text-gray-500'>Veri silinecek eminmisiniz???</p>
                </li>
                <ul className='flex flex-row gap-x-2' onClick={closeDropdown}>
                  <li>
                    <button
                      className='btn btn-error btn-sm text-black'
                      onClick={() => deleteHandler(data?._id || id)}
                      disabled={isLoading}
                    >
                      Evet
                    </button>
                  </li>
                  <li>
                    <button className='btn btn-info btn-sm text-black'>Hayır</button>
                  </li>
                </ul>
              </ul>
            </div>
  )
}

export default DeleteDropdownButton
