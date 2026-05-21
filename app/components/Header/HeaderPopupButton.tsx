'use client';

import { usePopupStore } from "@/app/store/popupStore";

export default function HeaderPopupButton() {
    const { togglePopupState } = usePopupStore();

    return (
        <button onClick={togglePopupState}>Открыть попап222</button>
    );
}
