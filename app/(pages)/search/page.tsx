import type { Metadata } from 'next';
import Form from 'next/form';
import Link from 'next/link';

import { Breadcrumbs, NewsCard, ProductCard } from '@/app/components';
import type { Novost, Product, StrapiListResponse } from '@/app/types/types';
import fetchData from '@/app/utils/fetchData';

import styles from './style.module.scss';

type SearchPageProps = {
    searchParams: Promise<{
        query?: string | string[];
    }>;
};

const getQuery = (query: string | string[] | undefined) => {
    const value = Array.isArray(query) ? query[0] : query;
    return value?.trim().slice(0, 100) ?? '';
};

async function getSearchResults(query: string) {
    if (!query) {
        return { products: [], news: [] };
    }

    const encodedQuery = encodeURIComponent(query);
    const productsUrl = `/api/tovars?filters[title][$containsi]=${encodedQuery}&populate[0]=images&pagination[pageSize]=100`;
    const newsUrl = `/api/novostis?filters[title][$containsi]=${encodedQuery}&populate[0]=image&populate[1]=kategorii_novostejs&pagination[pageSize]=100&sort[0]=createdAt:desc`;

    const [productsResponse, newsResponse] = await Promise.all([
        fetchData<StrapiListResponse<Product[]>>(productsUrl),
        fetchData<StrapiListResponse<Novost[]>>(newsUrl),
    ]);

    return {
        products: productsResponse.data ?? [],
        news: newsResponse.data ?? [],
    };
}

export const metadata: Metadata = {
    title: 'Поиск по сайту | RiftVL',
    description: 'Поиск товаров, новостей и статей на сайте RiftVL',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = getQuery((await searchParams).query);
    const { products, news } = await getSearchResults(query);
    const resultsCount = products.length + news.length;

    return (
        <>
            <Breadcrumbs secondLabel="Поиск" />

            <section className={styles.page}>
                <div className="container">
                    <div className={styles.header}>
                        <p className={styles.eyebrow}>Поиск по сайту</p>
                        <h1 className={styles.title}>
                            {query ? `Результаты по запросу «${query}»` : 'Что вы хотите найти?'}
                        </h1>
                    </div>

                    <Form action="/search" className={styles.searchForm}>
                        <label className="visually-hidden" htmlFor="search-page-query">
                            Поисковый запрос
                        </label>
                        <input
                            id="search-page-query"
                            className={styles.searchInput}
                            type="search"
                            name="query"
                            defaultValue={query}
                            placeholder="Например, винилэфирная смола"
                            maxLength={100}
                            autoComplete="off"
                        />
                        <button className={styles.searchButton} type="submit">
                            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Найти
                        </button>
                    </Form>

                    {!query ? (
                        <div className={styles.emptyState}>
                            <h2>Введите запрос в строке поиска</h2>
                            <p>Мы найдём подходящие товары, новости и полезные статьи.</p>
                        </div>
                    ) : resultsCount === 0 ? (
                        <div className={styles.emptyState}>
                            <h2>По вашему запросу ничего не найдено</h2>
                            <p>Попробуйте изменить формулировку или перейти в каталог продукции.</p>
                            <Link className={styles.catalogLink} href="/catalog">
                                Перейти в каталог
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.results}>
                            <p className={styles.summary} aria-live="polite">
                                Найдено: <strong>{resultsCount}</strong>
                            </p>

                            {products.length > 0 ? (
                                <section className={styles.resultSection} aria-labelledby="search-products-title">
                                    <div className={styles.sectionHeader}>
                                        <h2 id="search-products-title">Товары</h2>
                                        <span>{products.length}</span>
                                    </div>
                                    <ul className={styles.productsGrid}>
                                        {products.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </ul>
                                </section>
                            ) : null}

                            {news.length > 0 ? (
                                <section className={styles.resultSection} aria-labelledby="search-news-title">
                                    <div className={styles.sectionHeader}>
                                        <h2 id="search-news-title">Новости и статьи</h2>
                                        <span>{news.length}</span>
                                    </div>
                                    <div className={styles.newsGrid}>
                                        {news.map((item) => (
                                            <NewsCard key={item.id} item={item} titleAs="h3" />
                                        ))}
                                    </div>
                                </section>
                            ) : null}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
