import fetchData from "@/app/utils/fetchData";
import { Contact, StrapiSingleResponse } from "@/app/types/types";
import HeaderShell from "./HeaderShell";
import type { NavigationItem } from "../Navigation/Navigation";

type NavigationResponse = {
    data?: {
        list?: NavigationItem[];
    }[];
};

export default async function Header() {
    const contacts = await fetchData<StrapiSingleResponse<Contact>>("/api/kontakty");
    const phone = contacts.data?.phone || "";
    const address = contacts.data?.address || "";

    const navigation = await fetchData<NavigationResponse>("/api/glavnoe-menyus?populate=*");
    const navigationList = navigation.data?.[0]?.list || [];

    return (
        <HeaderShell
            phone={phone}
            navigationList={navigationList}
            address={address}
        />
    );
}