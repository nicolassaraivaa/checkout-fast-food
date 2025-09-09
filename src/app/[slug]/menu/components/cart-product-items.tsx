import { Minus, Plus, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/utils/formatCurrency";

import { CartProduct } from "../context/cart";

interface CartItemsProps {
    product: CartProduct
}

const CartProductItems = ({ product }: CartItemsProps) => {
    return (
        <div className="flex items-center justify-between">
            {/* ESQUERDA */}
            <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                    />
                </div>
                <div className="space-y-1">
                    {/* DIREITA */}
                    <p className="text-sm max-w-[75%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrencyBRL(product.price)}</p>
                    {/* QUANTIDADE */}
                    <div className="flex items-center gap-1 text-center">
                        <Button
                            variant="outline"
                            className="h-7 w-7 rounded-lg"
                        >
                            <Minus />
                        </Button>
                        <p className="w-8 text-xs">{product.quantity}</p>
                        <Button
                            variant="destructive"
                            className="h-7 w-7 rounded-lg"
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>
            {/* BOTÃO DELETAR */}
            <Button className="h-7 w-7 rounded-lg" variant='outline'>    
                <TrashIcon/>
            </Button>
        </div>
    );
}

export default CartProductItems;