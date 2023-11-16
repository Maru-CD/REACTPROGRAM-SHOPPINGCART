import React from "react"
import { FiShoppingCart } from 'react-icons/fi'
import { LuLayoutList } from 'react-icons/lu'
import useCart from "../hooks/useCart"

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Nav = ({ viewCart, setViewCart }: PropsType) => {

    const cartIcon: React.ReactElement = <FiShoppingCart size='3em' color='#1c1c1c'/> ;
    const prodIcon: React.ReactElement = <LuLayoutList size='3em' color='#1c1c1c'/>;
    const { totalItems } = useCart()
    const itemsNumber = <p className='items-number'>{totalItems}</p>

    const button = viewCart
        ? <button onClick={() => setViewCart(false)}>{prodIcon}</button>
        : <button onClick={() => setViewCart(true)}>{cartIcon}</button>

    const content = (
        <nav className="nav">
           <p className='cart-icon-number'>{button}{itemsNumber}</p>
        </nav>
    )

    return content
}
export default Nav