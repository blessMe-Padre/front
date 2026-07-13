import HeaderContent from "./HeaderContent";
import type { NavigationItem } from "../Navigation/Navigation";
import { CatalogMenuItem } from "@/app/types/types";

type HeaderShellProps = {
    phone: string;
    navigationList: NavigationItem[];
    address: string;
    telegram: string;
    max: string;
    email: string;
    catalogMenu: CatalogMenuItem[];
};

export default function HeaderShell({ phone, navigationList, address, telegram, max, email, catalogMenu }: HeaderShellProps) {
    return (
        <HeaderContent
            phone={phone}
            navigationList={navigationList}
            address={address}
            telegram={telegram}
            max={max}
            email={email}
            catalogMenu={catalogMenu}
        />
    );
}
