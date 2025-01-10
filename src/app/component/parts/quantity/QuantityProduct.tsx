import React, { FunctionComponent, useEffect, useState } from 'react'
import ButtonComponent from '../button/Button.componet'

interface QuantityProduct {
  props?: any
  quantity?: any
  setQuantity(value: number): void
  listQuantityRemain: any[]
  colorSelect: any
  sizeSelect: any
}
const QuantityProduct: FunctionComponent<QuantityProduct> = ({
  quantity,
  listQuantityRemain,
  colorSelect,
  sizeSelect,
  setQuantity
}) => {
  const [objectError, setObjectError] = useState({
    increment: false,
    decrement: false
  })

  const [quantityWithCondition, setQuantityWithCondition] = useState<any>({})
  useEffect(() => {
    const findElement = listQuantityRemain?.find(
      (item: any) => item.nameColor == colorSelect?.nameColor && item.nameSize == sizeSelect?.nameSize
    )
    if (findElement) {
      if (Number(quantity) > Number(findElement.quantity)) {
        setQuantity(findElement.quantity)
      }
      setQuantityWithCondition(findElement.quantity)
    } else {
      setQuantityWithCondition(0)
    }
  }, [colorSelect, sizeSelect])

  const handleDecrement = () => {
    setQuantity(Number(quantity) == 1 ? 1 : Number(quantity) - 1)
    setObjectError((prev) => ({
      ...prev,
      increment: false
    }))
  }

  const handleIncrement = () => {
    if (Number(quantity) < Number(quantityWithCondition)) {
      setQuantity(Number(quantity) + 1)
    }
    if (Number(quantity) === Number(quantityWithCondition)) {
      setObjectError((prev) => ({
        ...prev,
        increment: true
      }))
    }
  }
  const handleChangeInput = (event: any) => {
    if (event.target.value.match('^[0-9]*$')) {
      if (event.target.value.trim() !== '' && Number(event.target.value.trim()) < 1) {
        setQuantity(1)
      } else {
        if (Number(event.target.value) > Number(quantityWithCondition)) {
          setQuantity(quantityWithCondition)
          setObjectError((prev) => ({
            ...prev,
            increment: true
          }))
        } else {
          setQuantity(event.target.value)
          setObjectError((prev) => ({
            ...prev,
            increment: false
          }))
        }
      }
    }
  }
  return (
    <div className='pb-6'>
      <div className='sm:flex items-center mt-5 max-sm:flex border border-gray-300  rounded-[19px]'>
        <button className=' py-4 px-6' onClick={handleDecrement}>
          -
        </button>
        <input
          type='text'
          onChange={handleChangeInput}
          className='max-sm:w-[25px]  h-[2.7em] w-16 text-center focus:outline-none focus:border-sky-600 '
          value={quantity}
        />
        <button
          className={`py-4 px-6 ${objectError.increment && 'pointer-events-none bg-slate-200'} `}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default QuantityProduct
