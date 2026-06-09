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
    address?: string;
    telegram?: string;
    max?: string;
    email?: string;
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
