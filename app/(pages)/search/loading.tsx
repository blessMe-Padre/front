import styles from './style.module.scss';

export default function SearchLoading() {
    return (
        <section className={styles.page}>
            <div className="container">
                <p className={styles.eyebrow}>Поиск по сайту</p>
                <h1 className={styles.title}>Ищем подходящие результаты…</h1>
            </div>
        </section>
    );
}
