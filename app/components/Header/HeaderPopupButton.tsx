'use client';

import styles from "./style.module.scss"; 

import { usePopupStore } from "@/app/store/popupStore";

export default function HeaderPopupButton() {
    const { togglePopupState } = usePopupStore();
 
    return (
        <button 
            className={styles.headerPopupButton}
            onClick={togglePopupState} 
            type="button"
        >
            Связаться с нами
         </button>
    );
}
