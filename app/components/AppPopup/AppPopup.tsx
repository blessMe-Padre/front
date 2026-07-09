'use client';

import { Popup } from '..';
import { usePopupStore } from '@/app/store/popupStore';

export default function AppPopup() {
    const { popupOpened, togglePopupState } = usePopupStore();

    return <Popup active={popupOpened} setActive={togglePopupState} />;
}
