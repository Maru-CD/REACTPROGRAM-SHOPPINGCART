import useCart from "../hooks/useCart"
import { useState } from "react"
import CartLineItem from "./CartLineItem"
import { BsFillBagFill } from "react-icons/bs"

const Cart = () => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()

    const ssl: string = new URL(`../images/imgssllogo.png`, import.meta.url).href
    console.log(ssl)

    const onSubmitOrder = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT })
        setConfirm(true)
    } 

    const pageContent = confirm
        ? <><center><h1>Your order has been submitted! </h1></center></>
        : <>
            <h2>My Cart <hr></hr></h2>
            <ul className="cart">
                {cart.map(item => {
                    return (
                        <CartLineItem
                            key={item.id}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTIONS={REDUCER_ACTIONS}
                        />
                    )
                })}
                <div className="cart"> 
                <h4>Order Summary <hr></hr></h4>
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: {totalPrice}</p>
                    <button className="checkout-button" disabled={!totalItems} onClick={onSubmitOrder}>
                        <center><BsFillBagFill size="1rem"/>  <>Checkout </></center>
                    </button>    
                    <img src={ssl} alt="ssl" className="ssl-logo"/>
                </div>
                </ul>
        </>

    const emptyCart = (
        <center><h3>Your cart is empty!</h3></center>
    )

    const content = (
        <main className="main--cart">
        {pageContent}
        </main>
        )
    
    if (!totalItems) {
        return emptyCart
        } 

    return content 
        
}; 

export default Cart