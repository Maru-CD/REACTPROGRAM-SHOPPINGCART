import { createContext, ReactElement, useState } from "react"

export type ProductType = {
    id: string,
    name: string,
    price: number,
}

const initState: ProductType[] = [

    {
        "id": "item0001",
        "name": "Product 1",
        "price": 25.00
    },
    {
        "id": "item0002",
        "name": "I'm a product",
        "price": 25.00
    },
    {
        "id": "item0003",
        "name": "I'm a product",
        "price": 25.00
    },
    {
        "id": "item0004",
        "name": "I'm a product",
        "price": 25.00
    },
    {
        "id": "item0005",
        "name": "I'm a product",
        "price": 25.00
    },
    {
        "id": "item0006",
        "name": "I'm a product",
        "price": 25.00
    },
    {
        "id": "item0007",
        "name": "I'm a product",
        "price": 25.00
    },
    {
        "id": "item0008",
        "name": "I'm a product",
        "price": 25.00
    }
]

export type UseProductsContextType = { products: ProductType[] }

const initContextState: UseProductsContextType = { products: [] }

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products] = useState<ProductType[]>(initState)

    // useEffect(() => {
    //     const fetchProducts = async (): Promise<ProductType[]> => {
    //         const data = await fetch('http://localhost:3500/products').then(res => {
    //             return res.json()
    //         }).catch(err => {
    //             if (err instanceof Error) console.log(err.message)
    //         })
    //         return data
    //     }

    //     fetchProducts().then(products => setProducts(products))
    // }, [])

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )

}

export default ProductsContext 