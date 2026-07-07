import Link from 'next/link';
import styles from './style.module.scss';

interface BreadcrumbsProps {
    secondLink?: string;
    secondLabel?: string;
    thirdLink?: string;
    thirdLabel?: string;
}

export default function Breadcrumbs({ secondLink, secondLabel, thirdLink, thirdLabel }: BreadcrumbsProps) {

    return (
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <div className="container">
                <ul>
                    <li>
                        <Link href="/">Главная</Link>
                    </li>
                    {secondLabel && (
                        <li>
                            {thirdLabel && secondLink ? (
                                <Link href={secondLink}>{secondLabel}</Link>
                            ) : (
                                <span className={styles.active} aria-current="page">{secondLabel}</span>
                            )}
                        </li>
                    )}
                    {thirdLabel && (
                        <li 
                        className={styles.active} aria-current="page">
                            {thirdLink ? (
                                <Link href={thirdLink}>{thirdLabel}</Link>
                            ) : (
                                <span className={styles.active} aria-current="page">{thirdLabel}</span>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
