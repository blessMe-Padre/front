'use client';

import { useState, useEffect } from 'react';
import { ViewTransition } from 'react';

import NewsCard from '@/app/components/NewsCard/NewsCard';
import fetchData from '@/app/utils/fetchData';
import { KategoriyaNovosti, Novost, StrapiListResponse } from '@/app/types/types';

import styles from './style.module.scss';
import { FormSection } from '@/app/sections';

const pageSize = 4;

const buildUrl = (page: number, categorySlug?: string) =>
    `/api/novostis?populate[0]=image&populate[1]=kategorii_novostejs&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc${categorySlug ? `&filters[kategorii_novostejs][slug][$eq]=${categorySlug}` : ''}`;

export default function ContentPage() {
    const [data, setData] = useState<Novost[]>([]);
    const [categories, setCategories] = useState<KategoriyaNovosti[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const isInitialLoading = loading && data.length === 0;

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchData<StrapiListResponse<KategoriyaNovosti[]>>(
                    '/api/kategorii-novostejs?sort[0]=name:asc'
                );
                setCategories(response?.data ?? []);
            } catch (error) {
                console.error('Ошибка загрузки категорий', error);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);

            try {
                const response = await fetchData<StrapiListResponse<Novost[]>>(
                    buildUrl(1, selectedCategory ?? undefined)
                );
                const items = response?.data ?? [];
                const pagination = response?.meta?.pagination;

                setData(items);
                setPage(1);
                setHasMore(pagination ? pagination.page < pagination.pageCount : false);
            } catch (error) {
                console.error('Ошибка загрузки новостей', error);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, [selectedCategory]);

    const handleCategoryClick = (categorySlug: string | null) => {
        if (categorySlug === selectedCategory) return;
        setSelectedCategory(categorySlug);
    };

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);

        try {
            const response = await fetchData<StrapiListResponse<Novost[]>>(
                buildUrl(page + 1, selectedCategory ?? undefined)
            );
            const items = response?.data ?? [];
            const pagination = response?.meta?.pagination;

            setData((prev) => [...prev, ...items]);
            setPage((prev) => prev + 1);
            setHasMore(pagination ? page + 1 < pagination.pageCount : false);
        } catch (error) {
            console.error('Ошибка загрузки новостей', error);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <ViewTransition name="news">
        <div className="container">
            <h1 className={styles.title}>Новости и статьи</h1>

            {categories.length > 0 ? (
                <ul className={styles.categories}>
                    <li>
                        <button
                            type="button"
                            className={`${styles.category} ${selectedCategory === null ? styles.category_active : ''}`}
                            onClick={() => handleCategoryClick(null)}
                        >
                            Все
                        </button>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                type="button"
                                className={`${styles.category} ${selectedCategory === category.slug ? styles.category_active : ''}`}
                                onClick={() => handleCategoryClick(category.slug ?? null)}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}

            {isInitialLoading ? <div className={styles.loading}>Загрузка...</div> : null}

            {!loading && data.length === 0 ? (
                <div className={styles.empty}>Новости не найдены</div>
            ) : null}

            <ul className={styles.news_list} aria-busy={loading}>
                {data.map((item) => (
                    <li className={styles.news_item} key={item.id}>
                        <NewsCard
                            item={item}
                            titleAs="h2"
                            imageSizes="(max-width: 560px) 100vw, 25vw"
                        />
                    </li>
                ))}
            </ul>

            {hasMore ? (
                <button
                    className={`button_primary ${styles.loadMore}`}
                    onClick={loadMore}
                    disabled={loadingMore || loading}
                >
                    {loadingMore ? 'Загрузка...' : 'Загрузить еще'}
                </button>
            ) : null}

            <FormSection 
                background={2}
                textColor="white" 
                title="Хотите быть в курсе всех новинок?" 
                description="Подпишитесь на нашу рассылку и получайте свежие новости и статьи о последних тенденциях в мире композитных материалов, а также эксклюзивные предложения от компании РИФ" 
            />

        </div>
       </ViewTransition>
    )
}
