import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserData = {
    documentId?: string;
    username?: string;
    email?: string;
    [key: string]: unknown;
};

type UserStore = {
    userData: UserData;
    setUserData: (userData?: UserData) => void;
    setUserDocumentId: (documentId: string) => void;
};

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            userData: {},
            setUserData: (userData = {}) => {
                set({ userData });
            },
            setUserDocumentId: (documentId) => {
                set((state) => ({ userData: { ...state.userData, documentId } }));
            }
        }),
        {
            name: 'user-storage'
        }
    )
);

export default useUserStore;
