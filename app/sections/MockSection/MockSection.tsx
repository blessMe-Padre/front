'use client';

import styles from "./style.module.scss";

export default function MockSection() {
    return (
        <section className={styles.mockSection}>
            <div className="container">
                <h1>mock section</h1>
            </div>
        </section>
    );
}