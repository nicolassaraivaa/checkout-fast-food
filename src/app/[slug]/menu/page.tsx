import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ consumptionMethod: string }>
}

const isCounsumptionMethodValid = (value: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(value.toUpperCase())
}

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
    const { slug } = await params
    const { consumptionMethod } = await searchParams

    if (!isCounsumptionMethodValid(consumptionMethod)) {
        return notFound()
    }

    const restaurant = await getRestaurantBySlug(slug)

    if (!restaurant) {
        return notFound()

    }

    return (
        <div>
            <RestaurantHeader restaurant={restaurant}/>
            <RestaurantCategories restaurant={restaurant}/>
        </div>
    );
}

export default RestaurantMenuPage;