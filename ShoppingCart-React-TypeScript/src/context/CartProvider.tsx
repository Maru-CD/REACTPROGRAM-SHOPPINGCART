import { useMemo, useReducer, createContext, ReactElement } from "react"

export type CartItemType = {
    id: string,
    name: string,
    price: number,
    quantity: number,
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.payload missing in ADD action')
            }

            const { id, name, price } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            const quantity: number = itemExists ? itemExists.quantity + 1 : 1 

            return { ...state, cart: [...filteredCart, { id, name, price, quantity }] }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }

            const { id } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            return { ...state, cart: [...filteredCart] }
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }

            const { id, quantity } = action.payload

            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            if (!itemExists) {
                throw new Error('Add a product to update quantity')
            }

            const updatedItem: CartItemType = { ...itemExists, quantity }

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            return { ...state, cart: [...filteredCart, updatedItem] }
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
        }
        default:
            throw new Error('Unidentified reducer action type')
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.quantity
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.quantity * cartItem.price)
        }, 0)
    )

    //to organize items in id order
    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.id.slice(-4))
        const itemB = Number(b.id.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext
