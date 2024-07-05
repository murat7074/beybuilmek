import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginFormInput = ({
  showEye,
  labelText,
  type,
  id,
  onChange,
  name,
  value,
}) => {
  const [passwordType, setPasswordType] = useState('password');

  const handleToggle = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className='mb-4 relative'>
      <label htmlFor={id} className='block text-gray-600 mb-1'>
        {labelText}
      </label>
      <div className='relative'>
        <input
          type={type ? type : passwordType}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className='border border-gray-300 rounded-md px-3 py-2 w-full'
        />
        {showEye === 'showEye' && (
          <span className='absolute inset-y-0 right-0 flex items-center'>
            <span className='mr-1 cursor-pointer' onClick={handleToggle}>
              {passwordType === 'password' ? <FiEyeOff size={20} />   :  <FiEye size={20} />}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default LoginFormInput;




