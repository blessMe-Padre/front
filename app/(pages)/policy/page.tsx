import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, ContentRenderer } from '@/app/components';
import type { ContentItem } from '@/app/components/ContentRenderer/ContentRenderer';
import fetchData from '@/app/utils/fetchData';

export const metadata: Metadata = {
    title: 'Политика конфиденциальности | RiftVL',
    description: 'Политика конфиденциальности для RiftVL',
};

type PolicyResponse = {
    data?: {
        content?: ContentItem[] | null;
    } | null;
};



///api/politika-konfidenczialnosti
export default async function Policy() {
    const policy = await fetchData<PolicyResponse>('/api/politika-konfidenczialnosti');
    const content = policy.data?.content ?? null;

    if (!content) {
        return notFound();
    }

    return (
        <ViewTransition name="policy">
            <Breadcrumbs secondLabel="Политика конфиденциальности" />
            <div className="container" style={{ marginBottom: '60px' }}>
                <h1 className='title'>Политика конфиденциальности</h1>
                <ContentRenderer content={content} />
            </div>
        </ViewTransition>
    );
}