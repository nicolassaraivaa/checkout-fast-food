/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";
import CartItems from "./cart-product-items";

const CartSheet = () => {
    const {isOpen, toggleCart, products} = useContext(CartContext)
    return (
        <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent className="w-[80%]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Sacola</SheetTitle>
                    </SheetHeader>
                    <div className="py-5">
                        {products.map(product => (
                            <CartItems key={product.id} product={product}/>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
    );
}
 
export default CartSheet;