
import Link from 'next/link';
import styles from './style.module.scss';

export interface NavigationItem {
    id: number;
    title: string;
    link: string;
    isBlank: boolean;
}

export default function Navigation({ navigationList }: { navigationList: NavigationItem[] }) {

    return (
        <nav className={styles.navigation}>
            <ul>
                {navigationList?.map((item: NavigationItem) => (
                    <li key={item.id}>
                        {item.isBlank ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        ) : (
                            <Link href={`/${item.link}`}>{item.title}</Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}