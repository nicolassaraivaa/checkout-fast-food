"use server"

import { headers } from 'next/headers'
import Stripe from 'stripe'

import { db } from '@/lib/prisma'
import { removeCpfPunctuation } from '@/utils/cpf'

import { CartProduct } from '../context/cart'

interface createStripeCheckoutInput {
    products: CartProduct[]
    orderId: number
    slug: string
    cpf: string
}

export const createStripeCheckout = async ({ products, orderId, slug, cpf }: createStripeCheckoutInput) => {

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing Stripe secret key")
    }

    const productsWithPrices = await db.product.findMany({
        where: {
            id: {
                in: products.map(product => product.id)
            }
        }
    })

    const origin = (await headers()).get("origin") as string

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-02-24.acacia'
    })

    const searchParams = new URLSearchParams()
    searchParams.set("cpf", removeCpfPunctuation(cpf))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
        cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
        metadata: {
            orderId
        },
        mode: 'payment',
        line_items: products.map(product => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: product.name,
                    images: [product.imageUrl]
                },
                unit_amount: productsWithPrices.find((p) => p.id === product.id)!.price * 100
            },
            quantity: product.quantity
        }))
    })
    return { sessionId: session.id }
}