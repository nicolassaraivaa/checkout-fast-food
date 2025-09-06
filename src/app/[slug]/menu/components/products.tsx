import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { formatCurrencyBRL } from "@/utils/formatCurrency";

interface ProductsProps {
    products: Product[]
}

const GetProducts = ({ products }: ProductsProps) => {
    return (
        <div className="space-y-3 px-5">
            {products.map(product => (
                <Link
                    href="/"
                    className="flex items-center justify-between gap-10 py-5 border-b"
                    key={product.id}
                >
                    {/* ESQUERDA */}
                    <div>
                        <h3 className="text-sm font-medium">
                            {product.name}
                        </h3>

                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {product.description}
                        </p>

                        <p className="pt-3 text-sm font-semibold">
                            {formatCurrencyBRL(product.price)}
                        </p>
                    </div>

                    {/* DIREITA */}
                    <div className="relative min-h-[85px] min-w-[100px]">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain"
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default GetProducts;