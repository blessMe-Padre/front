
import Link from 'next/link';
import styles from './style.module.scss';
import fetchData from '@/app/utils/fetchData';

interface NavigationResponse {
    data: Array<{
        id: number;
        list: NavigationItem[];
    }>;
}

interface NavigationItem {
    id: number;
    title: string;
    link: string;
    isBlank: boolean;
}

export default async function Navigation() {

    const navigation = await fetchData<NavigationResponse>("/api/glavnoe-menyus?populate=*");
    const navigationList = navigation.data?.[0]?.list;

    return (
        <nav className={styles.navigation}>
            <ul>
                {navigationList?.map((item: NavigationItem) => (
                    <li key={item.id}>
                        {item.isBlank ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        ) : (
                            <Link href={item.link}>{item.title}</Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}