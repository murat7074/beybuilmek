import { useEffect, useState } from 'react'

/* 
sayfaya git de olmayan sayfayı yazdığımızda birden fazla hata vermesin diye bu kodları kullanıyoruz.
Örnek : syafa 3 yok ve kullanıcı 333 yazdı 3 hata yerine bir hata mesajı vericez
 */

const DebouncedInput = ({
  value: initValue,
  onChange,
  debounce = 1000,
  ...props
}) => {
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  // *  0.5s after set value in state
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default DebouncedInput
