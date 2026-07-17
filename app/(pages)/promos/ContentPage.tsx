'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import fetchData from '@/app/utils/fetchData';
import { Novost, StrapiListResponse } from '@/app/types/types';
import formatDate from '@/app/utils/formatDate';

import styles from './style.module.scss';
import { FormSection } from '@/app/sections';

const pageSize = 4;
const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";


// /api/akcziis

const buildUrl = (page: number) =>
    `/api/akcziis?populate[0]=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`;

export default function ContentPage() {
    const [data, setData] = useState<Novost[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);

            try {
                const response = await fetchData<StrapiListResponse<Novost[]>>(
                    buildUrl(1)
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
    }, []);

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);

        try {
            const response = await fetchData<StrapiListResponse<Novost[]>>(
                buildUrl(page + 1)
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
        <div className="container">
            <div className={styles.page_content}>
            <h1 className={styles.title}>Акции</h1>
            <p className={styles.description}>Успейте воспользоваться выгодными предложениями на композитные материалы!</p>

            {loading ? <div className={styles.loading}>Загрузка...</div> : null}

            {!loading && data.length === 0 ? (
                <div className={styles.empty}>Акции не найдены</div>
            ) : null}

            <ul className={styles.news_list}>
                {!loading && data.map((item) => {
                    const imageSrc = item.image?.url
                        ? `${imageServer}${item.image.url}`
                        : "/placeholder.svg";

                return(
                    <li className={styles.promo_item} key={item.id}>
                        <Link href={`/promos/${item.slug}`}>
                            <div className={styles.promo_image}>
                                <Image
                                    src={imageSrc}
                                    fill
                                    sizes="(max-width: 560px) 100vw, 25vw"
                                    alt={item.title}
                                />
                            </div>
                        </Link>
                    </li>
                )})}
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
            </div>

            <FormSection 
                background={2}
                buttonText="Получить консультацию"
                title="Хотите быть в курсе всех новинок?" 
                description="Подпишитесь на нашу рассылку и получайте свежие новости и статьи о последних тенденциях в мире композитных материалов, а также эксклюзивные предложения от компании РИФ" 
                />
            </div>
    )
}
