'use client';
import { Popup } from '..';
import { usePopupStore } from '@/app/store/popupStore';
import styles from './style.module.scss';

export default function Footer() {
    const { popupOpened, togglePopupState } = usePopupStore();
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p>Footer</p>
            </div>
            <Popup active={popupOpened} setActive={togglePopupState} />
        </footer>
    );
}