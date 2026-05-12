import { create } from "zustand";

/**
 * Состояние попапа с формой заявки
 * popupOpened: true - попап открыт
 * popupOpened: false - попап закрыт
 * togglePopupState: функция для переключения состояния попапа
 */

type PopupStore = {
  popupOpened: boolean;
  togglePopupState: () => void;
};

export const usePopupStore = create<PopupStore>((set) => ({
  popupOpened: false,
  togglePopupState: () => set((state) => ({ popupOpened: !state.popupOpened })),
}));