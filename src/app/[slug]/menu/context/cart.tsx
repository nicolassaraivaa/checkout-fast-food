"use client"

import { Product } from "@prisma/client"
import { createContext, ReactNode, useState } from "react"

export interface CartProduct extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
    quantity: number
}

export interface CartContextProps {
    isOpen: boolean
    total: number
    totalQuantity: number
    products: CartProduct[]
    toggleCart: () => void
    addProduct: (product: CartProduct) => void
    decreaseProductQuantity: (productId: string) => void
    increaseProductQuantity: (productId: string) => void
    removeProduct: (productId: string) => void
}

export const CartContext = createContext<CartContextProps>({
    isOpen: false,
    totalQuantity: 0,
    total: 0,
    products: [],
    toggleCart: () => { },
    addProduct: () => { },
    decreaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProduct: () => {}

})

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity
    }, 0)

    const totalQuantity = products.reduce((acc, product) => {
        return acc + product.quantity
    }, 0)

    const toggleCart = () => {
        setIsOpen((prev) => !prev)
    }

    const addProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some(
            (prev) => prev.id === product.id
        )

        if (!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product])
        }

        setProducts(prev => {
            return prev.map(prevProduct => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity
                    }
                }
                return prevProduct
            })
        })


    }

    const decreaseProductQuantity = (productId: string) => {
        setProducts(prev => {
            return prev.map(prevProduct => {
                if (prevProduct.id !== productId) {
                    return prevProduct
                }

                if (prevProduct.quantity === 1) {
                    return prevProduct
                }
                return { ...prevProduct, quantity: prevProduct.quantity - 1 }
            })
        })
    }

    const increaseProductQuantity = (productId: string) => {
        setProducts(prev => {
            return prev.map(prevProduct => {
                if (prevProduct.id !== productId) {
                    return prevProduct
                }

                return { ...prevProduct, quantity: prevProduct.quantity + 1 }
            })
        })
    }

    const removeProduct = (productId: string) => {
        setProducts(prev => prev.filter(prevProduct => prevProduct.id !== productId))
    } 

    return (
        <CartContext.Provider
            value={{
                isOpen,
                total,
                products,
                toggleCart,
                addProduct,
                decreaseProductQuantity,
                increaseProductQuantity,
                removeProduct, 
                totalQuantity
            }}>
            {children}
        </CartContext.Provider>
    )
}