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

const characteristicLabels = {
    manufacturer: ["производитель", "бренд"],
    country: ["страна происхождения", "страна"],
    uvResistance: ["уф-стойкость", "уф стойкость", "uv"],
};

const normalizeCharacteristic = (value: string) =>
    value
        .toLowerCase()
        .replaceAll("ё", "е")
        .replace(/[^a-zа-я0-9]+/gi, " ")
        .trim();

const getCharacteristicValue = (product: Product, labels: string[]) => {
    const normalizedLabels = labels.map(normalizeCharacteristic);
    const characteristic = product.characteristics?.find((item) => {
        const label = normalizeCharacteristic(item.label);
        return normalizedLabels.some((normalizedLabel) => label === normalizedLabel || label.includes(normalizedLabel));
    });

    return characteristic?.value?.trim();
};

const getCharacteristicOptions = (products: Product[], labels: string[]) =>
    Array.from(
        new Set(
            products
                .map((product) => getCharacteristicValue(product, labels))
                .filter((value): value is string => Boolean(value))
        )
    ).sort((first, second) => first.localeCompare(second, "ru"));

const matchesCharacteristicFilter = (product: Product, labels: string[], selectedValues?: string[]) => {
    if (!selectedValues?.length) {
        return true;
    }

    const value = getCharacteristicValue(product, labels);
    const normalizedValue = normalizeCharacteristic(value ?? "");

    return selectedValues.some((selectedValue) => normalizedValue === normalizeCharacteristic(selectedValue));
};

const applyCharacteristicFilters = (products: Product[], filters: ReturnType<typeof getCatalogFilters>) =>
    products.filter(
        (product) =>
            matchesCharacteristicFilter(product, characteristicLabels.manufacturer, filters.manufacturer) &&
            matchesCharacteristicFilter(product, characteristicLabels.country, filters.country) &&
            matchesCharacteristicFilter(product, characteristicLabels.uvResistance, filters.uvResistance)
    );

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
    const products = applyCharacteristicFilters(response.data, appliedFilters);
    const filterOptions = {
        manufacturers: getCharacteristicOptions(response.data, characteristicLabels.manufacturer),
        countries: getCharacteristicOptions(response.data, characteristicLabels.country),
        uvResistances: getCharacteristicOptions(response.data, characteristicLabels.uvResistance),
    };

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
            />

            <h2>Товары</h2>
            <ProductGrid products={products} />
        </div>
        </>
    );
}