import fetchData from "@/app/utils/fetchData";
import Navigation from "../Navigation/Navigation";
import HeaderPopupButton from "./HeaderPopupButton";
import styles from "./style.module.scss";
import { Contact, StrapiSingleResponse } from "@/app/types/types";
import normalizePhone from "@/app/utils/NormalizePhone";
import Image from "next/image";
import { HeaderCatalogMenu, Search } from "@/app/components";


export default async function Header() {
    const contacts = await fetchData<StrapiSingleResponse<Contact>>("/api/kontakty");
    const phone = contacts.data?.phone || "";

    return (
        <header className= { styles.header } >
            <div className="container">
                <div className= {styles.header_top }>
                    <Navigation />
                    <div className= {styles.header_top_right }>
                        <a type="tel" href={normalizePhone(phone)}>{phone}</a>
                    </div>
                </div>

                <div className= {styles.header_wrapper }>
                    <Image src="/logo.svg" alt="logo" width={131} height={65} priority/>
                    <HeaderCatalogMenu />
                    <Search />
                    <HeaderPopupButton />
                </div>

            </div>
        </header>
    );
}