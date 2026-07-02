import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import fetchData from "@/app/utils/fetchData";
import { Product, StrapiListResponse } from "@/app/types/types";
import { notFound } from "next/navigation";
import ContentPage from "./ContentPage";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const response = await fetchData<StrapiListResponse<Product[]>>(
        `/api/tovars?populate[0]=images&filters[slug][$eq]=${slug}`
    );
    const product = response.data[0];
    if (!product) {
        return { title: "Товар не найден" };
    }
    return {
        title: `Rifvl | ${product?.title}`,
        description: product?.description ?? "Товар не найден",
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const response = await fetchData<StrapiListResponse<Product[]>>(
        `/api/tovars?populate[0]=images&filters[slug][$eq]=${slug}`
    );
    const product = response.data[0];

    if (!product) {
        return notFound();
    }

    return (
        <>
            <Breadcrumbs secondLink="/catalog" secondLabel="Каталог" thirdLabel={product?.title} />
            <div className="container">
                <ContentPage product={product}/>
            </div>
        </>
    );
}
