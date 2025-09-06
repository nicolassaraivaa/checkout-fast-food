import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/product-header";

interface ProductPageProps {
    params: Promise<{ slug: string, productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { productId, slug } = await params

    const product = await db.product.findUnique({ where: { id: productId } })

    if (!product) {
        return notFound()
    }

    return (
        <div>
            <ProductHeader product={product}/>
            <h1>Pagina de produto</h1>
            {slug}
            {productId}
        </div>
    );
}

export default ProductPage;