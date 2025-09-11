"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidCpf, removeCpfPunctuation } from "@/utils/cpf";

const formSchema = z.object({
    cpf: z.string().refine((value) => isValidCpf(value), {
        message: "CPF inválido!"
    })
})

type FormSchema = z.infer<typeof formSchema>

const CpfForm = () => {
    const navigate = useRouter()
    const pathName = usePathname()

    const form = useForm<FormSchema>({
        resolver: zodResolver((formSchema))
    })

    const onSubmit = async (data: FormSchema) => {
        navigate.replace(`${pathName}/?cpf=${removeCpfPunctuation(data.cpf)}`)
    }

    const handleCancel = async () => {
        navigate.back()
    }

    return (
        <Drawer open>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Visualizar Pedidos</DrawerTitle>
                    <DrawerDescription>Insira seu CPF abaixo para visualizar seus pedidos.</DrawerDescription>
                </DrawerHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="px-4">
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
                                variant='destructive' 
                                type="submit"
                                className="rounded-full w-full"
                            >
                                Confirmar
                            </Button>
                            <DrawerClose asChild>
                                <Button 
                                    variant="outline"  
                                    className="rounded-full w-full"
                                    onClick={handleCancel}
                                >   
                                    Cancelar   
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>

            </DrawerContent>
        </Drawer>
    );
}

export default CpfForm;