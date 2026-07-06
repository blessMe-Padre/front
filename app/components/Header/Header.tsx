import fetchData from "@/app/utils/fetchData";
import { CatalogMenuItem, Contact, StrapiListResponse, StrapiSingleResponse } from "@/app/types/types";
import HeaderShell from "./HeaderShell";
import type { NavigationItem } from "../Navigation/Navigation";
import { buildRootCategoriesUrl } from "@/app/utils/catalogQueries";

type NavigationResponse = {
    data?: {
        list?: NavigationItem[];
    }[];
};

export default async function Header() {
    const contacts = await fetchData<StrapiSingleResponse<Contact>>("/api/kontakty");
    const phone = contacts.data?.phone || "";
    const address = contacts.data?.address || "";
    const telegram = contacts.data?.telegram || "";
    const max = contacts.data?.max || "";
    const email = contacts.data?.email || "";

    const navigation = await fetchData<NavigationResponse>("/api/glavnoe-menyus?populate=*");
    const navigationList = navigation.data?.[0]?.list || [];

    const catalogMenu = await fetchData<StrapiListResponse<CatalogMenuItem[]>>(buildRootCategoriesUrl());
    
    return (
        <HeaderShell
            phone={phone}
            navigationList={navigationList}
            address={address}
            telegram={telegram}
            max={max}
            email={email}
            catalogMenu={catalogMenu.data || []}
        />
    );
}