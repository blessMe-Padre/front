// Дженерик (обобщённый) тип-алиас для ответа от Strapi
export type StrapiSingleResponse<T> = {
    data: T;
};

export type StrapiPagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};

export type StrapiListResponse<T> = {
    data: T;
    meta: {
        pagination: StrapiPagination;
    };
};

// Тип для контактов
export type Contact = {
    id: number;
    documentId?: string;
    phone?: string;
    phone_2?: string;
    address?: string;
    telegram?: string;
    max?: string;
    email?: string;
    ip_data?: string;
    ip_data_2?: string;
};

export type Dostavka = {
    id?: number;
    documentId?: string;
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
}

export type KategoriyaNovosti = {
    id: number;
    documentId?: string;
    name?: string;
    slug?: string;
};

export type Novost = {
    id: number;
    meta_title?: string;
    meta_description?: string;
    slug?: string;
    title: string;
    description?: string;
    image?: {
        url?: string;
    };
    kategorii_novostejs?: KategoriyaNovosti[];
    createdAt?: string;
};

export type StrapiImageFormat = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
};

export type StrapiImageFormats = {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
};

export type StrapiImage = {
    id: number;
    documentId?: string;
    name?: string;
    alternativeText?: string | null;
    caption?: string | null;
    focalPoint?: unknown | null;
    width?: number;
    height?: number;
    formats?: StrapiImageFormats;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    url: string;
    previewUrl?: string | null;
    provider?: string;
    provider_metadata?: unknown | null;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
};

export type ProductCharacteristic = {
    label: string;
    value: string;
};

export type Product = {
    id: number;
    documentId?: string;
    title: string;
    slug?: string;
    sku?: string;
    id1c?: string;
    description?: string;
    information?: string;
    price?: number;
    priceSales?: number;
    amount?: number;
    manufacturer?: string;
    country?: string;
    uvResistance?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    characteristics?: ProductCharacteristic[];
    images?: StrapiImage[];
    novinka?: boolean;
    akciya?: boolean;
};


export type CatalogMenuItem = {
    id: number;
    documentId?: string;
    name: string;
    slug: string;
    description?: string;
    isMainParent?: boolean;
    image?: StrapiImage | null;
    parent?: CatalogMenuItem | null;
    children?: CatalogMenuItem[];
};

export type CatalogSearchParams = {
    category?: string | string[];
    priceFrom?: string | string[];
    priceTo?: string | string[];
    inStock?: string | string[];
    manufacturer?: string | string[];
    country?: string | string[];
    uvResistance?: string | string[];
};