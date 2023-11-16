import React from "react"
import { ChangeEvent, ReactElement, memo } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import { TiDelete } from "react-icons/ti"

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
}

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {

    const img: string = new URL(`../images/${item.id}.png`, import.meta.url).href

    const lineTotal: number = (item.quantity * item.price)

    const highestQty: number = 20 > item.quantity ? 20 : item.quantity

    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, quantity: Number(e.target.value) }
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = (
        <li className="cart__item">
            <div><img className="cart__img" src={img} alt={item.name} /></div>
            <ul>
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</div>
            <select
                name="itemQty"
                id="itemQty"
                className="cart__select"
                value={item.quantity}
                aria-label="Item Quantity"
                onChange={onChangeQty}
            >{options}</select> 
            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label> 
            </ul>
            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
            </div>
            <div> 
            <button
                className="cart__button"
                aria-label="Remove Item From Cart"
                title="Remove Item From Cart"
                onClick={onRemoveFromCart}
            >
                <TiDelete size='1em' color='#1c1c1c'/>
            </button>  
            </div> 
        
        </li>
    )

    return content
}

function areItemsEqual({ item: prevItem }: PropsType, { item: nextItem }: PropsType) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem