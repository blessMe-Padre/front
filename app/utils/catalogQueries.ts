import { CatalogSearchParams } from "@/app/types/types";

export type CatalogFilters = {
    category?: string;
    priceFrom?: string;
    priceTo?: string;
    inStock?: boolean;
    manufacturer?: string[];
    country?: string[];
    uvResistance?: string[];
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

const paramList = (value: string | string[] | undefined) => {
    const params = Array.isArray(value) ? value : value ? [value] : [];
    return params.map((param) => param.trim()).filter(Boolean);
};

const appendInFilter = (params: URLSearchParams, field: string, values?: string[]) => {
    values?.forEach((value, index) => {
        params.append(`filters[${field}][$in][${index}]`, value);
    });
};

export const getCatalogFilters = (searchParams: CatalogSearchParams): CatalogFilters => ({
    category: firstParam(searchParams.category),
    priceFrom: numberParam(searchParams.priceFrom),
    priceTo: numberParam(searchParams.priceTo),
    inStock: firstParam(searchParams.inStock) === "1",
    manufacturer: paramList(searchParams.manufacturer),
    country: paramList(searchParams.country),
    uvResistance: paramList(searchParams.uvResistance),
});

export const buildRootCategoriesUrl = () => {
    const params = new URLSearchParams();

    params.append("populate[0]", "image");
    params.append("filters[parent][$null]", "true");
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

    appendInFilter(params, "manufacturer", filters.manufacturer);
    appendInFilter(params, "country", filters.country);
    appendInFilter(params, "uvResistance", filters.uvResistance);

    return withQuery("/api/tovars", params);
};

export const buildCatalogFilterOptionsUrl = (categorySlug: string, page = 1) => {
    const params = new URLSearchParams();

    params.append("fields[0]", "manufacturer");
    params.append("fields[1]", "country");
    params.append("fields[2]", "uvResistance");
    params.append("filters[kategoriis][slug][$eq]", categorySlug);
    params.append("pagination[page]", String(page));
    params.append("pagination[pageSize]", "100");

    return withQuery("/api/tovars", params);
};
