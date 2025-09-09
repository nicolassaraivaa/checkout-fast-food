import { useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import { formatCurrencyBRL } from "@/utils/formatCurrency";

import { CartContext } from "../context/cart";
import CartItems from "./cart-product-items";
import FinishOrderButton from "./finish-order-button";

const CartSheet = () => {
    const { isOpen, toggleCart, products, total } = useContext(CartContext)
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%]">
                <SheetHeader>
                    <SheetTitle className="text-left">Sacola</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-5 mt-3 h-full">
                    <div className="flex-auto">
                        {products.map(product => (
                            <CartItems key={product.id} product={product} />
                        ))}
                    </div>
                    
                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="font-semibold text-sm">{formatCurrencyBRL(total)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <FinishOrderButton/>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default CartSheet;