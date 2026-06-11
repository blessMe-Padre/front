

import Breadcrumbs from '@/app/components/Breadcrumbs/Breadcrumbs';
import ContentPage from './ContentPage';
import { Metadata } from 'next';
import { SpamSection } from '@/app/sections';



export const metadata: Metadata = {
    title: 'RiftVL | Акции',
    description: 'Акции и скидки на RiftVL',
    keywords: 'Акции, скидки, RiftVL',
}; 



export default async function PromosPage() {

    return (
        <>
            <Breadcrumbs secondLabel='Акции' />
            <ContentPage />
            <SpamSection />
        </>
    )
}


