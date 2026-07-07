import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import fetchData from "@/app/utils/fetchData";
import { CatalogMenuItem, CatalogSearchParams, Product, StrapiListResponse } from "@/app/types/types";
import {
    buildCatalogFilterOptionsUrl,
    buildCategoryBySlugUrl,
    buildProductsByCategoryUrl,
    getCatalogFilters,
} from "@/app/utils/catalogQueries";
import { notFound } from "next/navigation";
import CatalogFilters from "../components/CatalogFilters";
import ProductGrid from "../components/ProductGrid";

type CatalogSlugPageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<CatalogSearchParams>;
};

const getUniqueOptions = (values: Array<string | undefined>) =>
    Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)))).sort(
        (first, second) => first.localeCompare(second, "ru")
    );

const getCatalogFilterOptions = async (categorySlug: string) => {
    const firstPage = await fetchData<StrapiListResponse<Product[]>>(buildCatalogFilterOptionsUrl(categorySlug));
    const pageCount = firstPage.meta.pagination.pageCount;
    const otherPages =
        pageCount > 1
            ? await Promise.all(
                  Array.from({ length: pageCount - 1 }, (_, index) =>
                      fetchData<StrapiListResponse<Product[]>>(buildCatalogFilterOptionsUrl(categorySlug, index + 2))
                  )
              )
            : [];
    const products = [firstPage, ...otherPages].flatMap((response) => response.data);

    return {
        manufacturers: getUniqueOptions(products.map((product) => product.manufacturer)),
        countries: getUniqueOptions(products.map((product) => product.country)),
        uvResistances: getUniqueOptions(products.map((product) => product.uvResistance)),
    };
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

    const [response, filterOptions] = await Promise.all([
        fetchData<StrapiListResponse<Product[]>>(buildProductsByCategoryUrl(activeCategorySlug, appliedFilters)),
        getCatalogFilterOptions(activeCategorySlug),
    ]);
    const products = response.data;

    return (
        <>
        <Breadcrumbs secondLink="/catalog" secondLabel="Каталог" thirdLink={`/catalog/${slug}`} thirdLabel={category.name} />

        <div className="container">
            <h1>{category.name}</h1>
            
            <CatalogFilters
                currentSlug={slug}
                subcategories={subcategories}
                filters={appliedFilters}
                filterOptions={filterOptions}
                products={products}
            />

            {products.length > 0 ? <ProductGrid products={products} /> : <p>В данной категории пока нет товаров</p>}
        </div>
        </>
    );
}