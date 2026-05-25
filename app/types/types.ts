// Дженерик (обобщённый) тип-алиас для ответа от Strapi
export type StrapiSingleResponse<T> = {
    data: T;
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
