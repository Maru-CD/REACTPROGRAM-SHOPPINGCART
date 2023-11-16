import React from "react"
import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement, memo } from "react"
import {BsBag} from "react-icons/bs"

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

const inCartIcon = < BsBag size='1rem' color='#3c3c3c'/>

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {

    const img: string = new URL(`../images/${product.id}.png`, import.meta.url).href
    console.log(img)

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, quantity: 1 } })

    const itemInCart = inCart ? <> { inCartIcon } </>: null

    const content =
        <article className="product">
            <center><img src={img} alt={product.name} className="product__img" /></center>
            <center><h3>{product.name}</h3></center>
            <center><p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p></center>
            <center><button className='add-button' onClick={onAddToCart}>Add to Cart</button></center>
        </article>

    return content
}

function areProductsEqual({ product: prevProduct, inCart: prevInCart }: PropsType, { product: nextProduct, inCart: nextInCart }: PropsType) {
    return (
        Object.keys(prevProduct).every(key => {
            return prevProduct[key as keyof ProductType] ===
                nextProduct[key as keyof ProductType]
        }) && prevInCart === nextInCart
    )
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct