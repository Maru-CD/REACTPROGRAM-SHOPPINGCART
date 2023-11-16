import React from "react"
import Nav from "./Nav"

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}


const logo: string = new URL(`../images/logoRAW.png`, import.meta.url).href
    console.log(logo)

const Header = ({ viewCart, setViewCart }: PropsType) => {
    
    const content = (
        <header className="header">
            <div className="header__title-bar">
            <img src={logo} alt="logo" className="logo"/>
            <Nav viewCart={viewCart} setViewCart={setViewCart} />
            </div>
        </header>
    )

    return content
}
export default Header