import { CatalogMenuItem, StrapiListResponse } from "@/app/types/types";
import fetchData from '@/app/utils/fetchData';
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import { buildRootCategoriesUrl } from "@/app/utils/catalogQueries";
import CategoryCardList from "./components/CategoryCardList";
import FormSection from "@/app/sections/FormSection/FormSection";
import styles from "./style.module.scss";


export const metadata = {
    title: "RiftVL | Каталог продукции",
    description: "Каталог продукции RiftVL",
    keywords: "Каталог продукции, RiftVL",
}

export default async function CatalogPage() {
    const catalogMenu = await fetchData<StrapiListResponse<CatalogMenuItem[]>>(buildRootCategoriesUrl());

    return (
        <>
        <Breadcrumbs secondLink='/catalog' secondLabel='Каталог продукции' />

        <div className="container">
            <h1 className={styles.title}>Каталог продукции</h1>
            <CategoryCardList categories={catalogMenu.data || []} />
            <FormSection 
                background={1} 
                title="Не знаете, что выбрать?" 
                description="Оставьте заявку и мы подберем решение под вашу задачу с учетом условий эксплуатации, нагрузок и технологии производства" 
            />
        </div>

        </>
    );
}