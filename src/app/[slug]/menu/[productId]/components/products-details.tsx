"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrencyBRL } from "@/utils/formatCurrency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../context/cart";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,

                }
            }
        }
    }>
}

const ProductDatails = ({ product }: ProductDetailsProps) => {
    const { addProduct } = useContext(CartContext)
    const [quantity, setQuantity] = useState<number>(1)
    const navigate = useRouter()

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if (prev === 1) {
                return 1
            }
            return prev - 1
        })
    }

    const handleToAddCart = () => {
        addProduct({
            ...product,
            quantity: quantity
        })
        navigate.back()
        toast.success("Pedido(s) adicionado(s) á sacola!", {
            duration: 1500
        })
    }

    return (
        <>
            <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex-auto flex flex-col overflow-hidden">
                <div className="flex-auto overflow-hidden">
                    {/* RESTAURANTE */}
                    <div className="flex items-center gap-1.5">
                        <Image
                            src={product.restaurant.avatarImageUrl}
                            alt={product.restaurant.name}
                            width={16}
                            height={16}
                            className="rounded-full"
                        />
                        <p className="gap-1 text-xs text-muted-foreground space-x-1">
                            {product.restaurant.name}
                        </p>
                    </div>

                    {/* NOME DO PRODUTO */}
                    <h2 className="text-xl font-semibold mt-1">
                        {product.name}
                    </h2>

                    {/* PREÇO E QUANTIDADE */}
                    <div className="flex items-center justify-between mt-3">
                        <h3 className="text-xl font-semibold">
                            {formatCurrencyBRL(product.price)}
                        </h3>
                        <div className="flex items-center gap-3 text-center">
                            <Button
                                variant="outline"
                                className="h-8 w-8 rounded-xl"
                                onClick={handleDecreaseQuantity}
                            >
                                <Minus />
                            </Button>
                            <p className="w-7">{quantity}</p>
                            <Button
                                variant="destructive"
                                className="h-8 w-8 rounded-xl"
                                onClick={handleIncreaseQuantity}
                            >
                                <Plus />
                            </Button>
                        </div>
                    </div>

                    <ScrollArea className="h-full pb-32 mt-5">
                        {/* SOBRE */}
                        <div className="space-y-3">
                            <h4 className="font-semibold">Sobre</h4>
                            <p className="text-sm text-muted-foreground">
                                {product.description}
                            </p>
                        </div>

                        {/* INGREDIENTES */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-1.5">
                                <ChefHatIcon size={18} />
                                <h4 className="font-semibold">Ingredientes</h4>
                            </div>
                            <ul className="list-disc px-5 text-sm text-muted-foreground space-y-2">
                                {product.ingredients.map((ingredient) => (
                                    <li key={ingredient}>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollArea>

                </div>


                <Button
                    onClick={handleToAddCart}
                    className="rounded-full w-full"
                >
                    Adicionar à sacola
                </Button>

            </div>
            <CartSheet />
        </>
    );
}

export default ProductDatails;