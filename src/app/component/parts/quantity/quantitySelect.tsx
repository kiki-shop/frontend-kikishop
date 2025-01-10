import { FunctionComponent, useEffect, useState } from 'react'
import { UpdateProductToCart } from '~/app/api/cart/cart.api'
import { useCartRedux } from '~/app/modules/client/redux/hook/useCartReducer'
interface SelectQuantityCartProps {
    props?: any
    quantityOrder: number | string
    listQuantityRemain: any[]
    itemCart: any
    colorSelect: any,
    sizeSelect: any
}

const SelectQuantityCart: FunctionComponent<SelectQuantityCartProps> = ({
    quantityOrder,
    listQuantityRemain,
    itemCart,
    colorSelect,
    sizeSelect
}) => {
    const [objectError, setObjectError] = useState({
        increment: false,
        decrement: false
    })
    const [quantity, setQuantity] = useState<any>()
    useEffect(() => {
        setQuantity(quantityOrder)
    }, [quantityOrder])
    const {
        actions
    } = useCartRedux()

    const [quantityWithCondition, setQuantityWithCondition] = useState<any>({})
    useEffect(() => {
        const findElement = listQuantityRemain?.find(
            (item) => item.nameColor === colorSelect?.nameColor && item.nameSize === sizeSelect?.nameSize
        )
        if (findElement) {
            setQuantityWithCondition(findElement.quantity)
        } else {
            setQuantityWithCondition(0)
        }
    }, [colorSelect, sizeSelect])
    const handleDecrement = async () => {
        const objectDecrement = {
            type: 'DECREMENT',
            quantityWithCondition,
            itemCart
        }

        actions.updateSelectQuantityCart(objectDecrement);

        setObjectError((prev) => ({
            ...prev,
            increment: false
        }));
        if (itemCart.quantityOrder.quantity > 1) {
            const requestObjectProduct = {
                productId: itemCart.product._id,
                quantityOrder: {
                    ...itemCart.quantityOrder,
                    quantity: itemCart.quantityOrder.quantity - 1
                }
            };
            await UpdateProductToCart(requestObjectProduct);
        }

    }


    const handleIncrement = () => {
        const objectIncrement = {
            type: 'INCREMENT',
            quantityWithCondition,
            itemCart
        }

        actions.updateSelectQuantityCart(objectIncrement)
        if (Number(itemCart.quantityOrder.quantity) === Number(quantityWithCondition)) {
            setObjectError((prev) => ({
                ...prev,
                increment: true
            }))
        }
        const requestObjectProduct = {
            productId: itemCart.product._id,
            quantityOrder: {
                ...itemCart.quantityOrder,
                quantity: itemCart.quantityOrder.quantity + 1
            }
        }

        UpdateProductToCart(requestObjectProduct)
    }

    const handleChangeInput = async (event: any) => {
        const objectIncrement = {
            type: 'ONCHANGE_INPUT',
            quantityWithCondition,
            itemCart,
            newQuantity: event.target.value,
        }
        actions.updateSelectQuantityCart(objectIncrement)
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
        const requestObjectProduct = {
            productId: itemCart.product._id,
            quantityOrder: {
                ...itemCart.quantityOrder,
                quantity: event.target.value == "" ? Number(1) : Number(event.target.value) || event.target.value > quantityWithCondition ? Number(quantityWithCondition) : Number(event.target.value)
            }
        }
          await UpdateProductToCart(requestObjectProduct)
    }

    return (
        <div>

            <div className='sm:flex max-sm:flex border border-solid border-gray-300 max-w-max rounded-lg'>
                <div
                    className='px-4 py-3 border-r border-solid border-gray-300 cursor-pointer hover:bg-slate-200'
                    onClick={handleDecrement}
                >
                    -
                </div>
                <input
                    type='text'
                    value={quantity}
                    className='outline-none w-[40px] text-center focus:border-blue-400'
                    onChange={handleChangeInput}
                />
                <div
                    className={`px-4 py-3 border-l border-solid border-gray-300 cursor-pointer hover:bg-slate-100 ${objectError.increment && 'pointer-events-none bg-slate-200'
                        }`}
                    onClick={handleIncrement}
                >
                    +
                </div>
            </div>
        </div>
    )
}

export default SelectQuantityCart