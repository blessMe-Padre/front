import { ViewTransition } from 'react';
import styles from './style.module.scss';
import { Breadcrumbs } from '@/app/components';

export default function About() {
    return (
        <ViewTransition name="about">
            <Breadcrumbs secondLabel="О компании"/>
        <div className={styles.about}>
            <div className="container">
                <h1 className={styles.title}>О компании</h1>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
            </div>
        </div>
        </ViewTransition>
    );
}