import { CatalogSearchParams } from "@/app/types/types";

export type CatalogFilters = {
    category?: string;
    priceFrom?: string;
    priceTo?: string;
    inStock?: boolean;
};

const withQuery = (pathname: string, params: URLSearchParams) => {
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
};

const firstParam = (value: string | string[] | undefined) => {
    const param = Array.isArray(value) ? value[0] : value;
    return param?.trim() || undefined;
};

const numberParam = (value: string | string[] | undefined) => {
    const param = firstParam(value);
    return param && /^\d+$/.test(param) ? param : undefined;
};

export const getCatalogFilters = (searchParams: CatalogSearchParams): CatalogFilters => ({
    category: firstParam(searchParams.category),
    priceFrom: numberParam(searchParams.priceFrom),
    priceTo: numberParam(searchParams.priceTo),
    inStock: firstParam(searchParams.inStock) === "1",
});

export const buildRootCategoriesUrl = () => {
    const params = new URLSearchParams();

    params.append("populate[0]", "image");
    params.append("filters[parent][$null]", "true");
    params.append("filters[isMainParent][$eq]", "true");
    params.append("sort[0]", "name:asc");

    return withQuery("/api/kategoriis", params);
};

export const buildCategoryBySlugUrl = (slug: string) => {
    const params = new URLSearchParams();

    params.append("populate[0]", "image");
    params.append("populate[1]", "parent");
    params.append("populate[children][populate][0]", "image");
    params.append("filters[slug][$eq]", slug);

    return withQuery("/api/kategoriis", params);
};

export const buildProductsByCategoryUrl = (categorySlug: string, filters: CatalogFilters = {}) => {
    const params = new URLSearchParams();

    params.append("populate[0]", "images");
    params.append("filters[kategoriis][slug][$eq]", categorySlug);
    params.append("pagination[pageSize]", "100");
    params.append("sort[0]", "title:asc");

    if (filters.priceFrom) {
        params.append("filters[price][$gte]", filters.priceFrom);
    }

    if (filters.priceTo) {
        params.append("filters[price][$lte]", filters.priceTo);
    }

    if (filters.inStock) {
        params.append("filters[amount][$gt]", "0");
    }

    return withQuery("/api/tovars", params);
};
