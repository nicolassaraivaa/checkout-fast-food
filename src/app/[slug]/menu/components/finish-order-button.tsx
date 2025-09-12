
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ConsumptionMethod } from "@prisma/client";
import { loadStripe } from '@stripe/stripe-js'
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format'
import { z } from 'zod'

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidCpf } from '@/utils/cpf';

import { createStripeCheckout } from "../actions/create_strip_checkout";
import { createOrder } from "../actions/create-order";
import { CartContext } from "../context/cart";

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: 'O nome é obrigatório!'
    }),
    cpf: z.string().refine((value) => isValidCpf(value), {
        message: "CPF inválido!"
    })
})

type FormSchema = z.infer<typeof formSchema>

const FinishOrderButton = () => {
    const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);

    const { slug } = useParams<{ slug: string }>()
    const searchParams = useSearchParams()
    const { products } = useContext(CartContext)
    const [isPeding, startTransaction] = useTransition()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: ""
        },
        shouldUnregister: true
    })

    const onSubmit = async (data: FormSchema) => {
        try {
            const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod
            startTransaction(async () => {
                const order = await createOrder({
                    consumptionMethod,
                    customerCpf: data.cpf,
                    customername: data.name,
                    products,
                    slug
                })
                const { sessionId } = await createStripeCheckout({
                    products,
                    orderId: order.id,
                    slug,
                    cpf: data.cpf
                })

                if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return

                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

                stripe?.redirectToCheckout({
                    sessionId: sessionId
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Drawer open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen}>
            <DrawerTrigger asChild>
                <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogIsOpen(true)}>
                    Finalizar pedidos
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o seu pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                placeholder="Digite seu CPF..."
                                                format="###.###.###-##"
                                                customInput={Input}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    className="rounded-full"
                                    disabled={isPeding}
                                >
                                    {isPeding && <Loader2Icon className="animate-spin" />}
                                    Finalizar
                                </Button>
                                <DrawerClose asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-full"
                                    >
                                        Cancel
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default FinishOrderButton;