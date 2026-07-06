import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import fetchData from "@/app/utils/fetchData";
import { CatalogMenuItem, CatalogSearchParams, Product, StrapiListResponse } from "@/app/types/types";
import { buildCategoryBySlugUrl, buildProductsByCategoryUrl, getCatalogFilters } from "@/app/utils/catalogQueries";
import { notFound } from "next/navigation";
import CatalogFilters from "../components/CatalogFilters";
import ProductGrid from "../components/ProductGrid";

type CatalogSlugPageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<CatalogSearchParams>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const response = await fetchData<StrapiListResponse<CatalogMenuItem[]>>(buildCategoryBySlugUrl(slug));
    const category = response.data[0];

    if (!category) {
        return { title: "Категория не найдена" };
    }

    return {
        title: `RiftVL | ${category.name}`,
        description: category.description ?? `Каталог продукции ${category.name}`,
    };
}

export default async function CatalogSlugPage({ params, searchParams }: CatalogSlugPageProps) {
    const [{ slug }, query] = await Promise.all([params, searchParams]);
    const filters = getCatalogFilters(query);

    const categoryResponse = await fetchData<StrapiListResponse<CatalogMenuItem[]>>(buildCategoryBySlugUrl(slug));
    const category = categoryResponse.data[0];

    if (!category) {
        return notFound();
    }

    const subcategories = category.children ?? [];
    const selectedSubcategory = subcategories.find((item) => item.slug === filters.category);
    const appliedFilters = {
        ...filters,
        category: selectedSubcategory?.slug,
    };
    const activeCategorySlug = selectedSubcategory?.slug ?? slug;

    const response = await fetchData<StrapiListResponse<Product[]>>(
        buildProductsByCategoryUrl(activeCategorySlug, appliedFilters)
    );
    const products = response.data;

    return (
        <>
        <Breadcrumbs secondLink="/catalog" secondLabel="Каталог" thirdLabel={category.name} />

        <div className="container">
            <h1>{category.name}</h1>
            {category.description ? <p>{category.description}</p> : null}

            <CatalogFilters
                currentSlug={slug}
                subcategories={subcategories}
                filters={appliedFilters}
            />

            <h2>Товары</h2>
            <ProductGrid products={products} />
        </div>
        </>
    );
}