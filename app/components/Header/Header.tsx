'use client';
import { usePopupStore } from "@/app/store/popupStore";
import styles from "./style.module.scss";


export default function Header() {
    const { togglePopupState } = usePopupStore();
    return (
        <header className= { styles.header } >
            <div className="container">
                <h1>Header</h1>
                <button onClick={togglePopupState}>Открыть попап</button>
            </div>
        </header>
    );
}