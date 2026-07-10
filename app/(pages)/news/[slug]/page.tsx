
import { Breadcrumbs, ContentRenderer, Form } from '@/app/components';
import fetchData from '@/app/utils/fetchData';

import Image from 'next/image';
import styles from '../style.module.scss';
import { ContentItem } from '@/app/components/ContentRenderer/ContentRenderer';
import Link from 'next/link';

type NewsResponse = {
    data?: {
        title?: string;
        image?: {
            url?: string;
        };
        content?: ContentItem[];
    }[];
};



const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const news = await fetchData<NewsResponse>(`/api/novostis?populate[0]=image&filters[slug][$eq]=${slug}`);
    const newsData = news?.data?.[0];
    const imageSrc = newsData?.image?.url ? `${imageServer}${newsData.image.url}` : "/placeholder.svg";

    return (
        <>
        <Breadcrumbs secondLink='/news' secondLabel='Новости' thirdLabel={newsData?.title} />

        <div className="container">
            <div className={styles.news_wrapper}>
                <div className={styles.news_mainimage}>
                    <Image src={imageSrc} alt={newsData?.title ?? ""} width={460} height={300} />
                </div>

                <div className={styles.news_content}>
                <h1 className={styles.page_title}>{newsData?.title}</h1>
                    <ContentRenderer content={newsData?.content ?? []} />

                    <div className={styles.news_back_wrapper}>
                        <Link href="/news" className={styles.news_back_link}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 7H2.04169" stroke="white" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.83333 2.91683L1.75 7.00016L5.83333 11.0835" stroke="white" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Назад к списку</span>
                        </Link>
                    </div>
                </div>

                <div className={styles.news_aside}>
                    <h2 className={styles.news_aside_title}>Хотите первыми узнавать о новостях и акциях?</h2>
                    <p className={styles.news_aside_text}>Подпишитесь на рассылку</p>
                    <Form formClassName="aside_form" buttonClassName="aside_button" />
                </div>
            </div>
            
        </div>
    </>
    );
}
