import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs, ContentRenderer } from '@/app/components';
import type { ContentItem } from '@/app/components/ContentRenderer/ContentRenderer';
import fetchData from '@/app/utils/fetchData';

export const metadata: Metadata = {
    title: 'Договор оферты | RiftVL',
    description: 'Договор оферты для RiftVL',
};

type PolicyResponse = {
    data?: {
        content?: ContentItem[] | null;
    } | null;
};

export default async function Policy() {
    const policy = await fetchData<PolicyResponse>('/api/stranicza-dogovor-oferty');
    const content = policy.data?.content ?? null;

    if (!content) {
        return notFound();
    }

    return (
        <>
            <Breadcrumbs secondLabel="Договор оферты" />
            <div className="container" style={{ marginBottom: '60px' }}>
                <h1 className='title'>Договор оферты</h1>
                <ContentRenderer content={content} />
            </div>
        </>
    );
}
