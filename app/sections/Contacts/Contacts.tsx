import fetchData from '@/app/utils/fetchData';
import {  Contact, StrapiSingleResponse } from "@/app/types/types";


import styles from './style.module.scss';
import { SocialIcon } from '@/app/components';
import normalizePhone from '@/app/utils/NormalizePhone';
import Image from 'next/image';

export default async function Contacts() {

    const contacts = await fetchData<StrapiSingleResponse<Contact>>("/api/kontakty");
    const data = contacts.data || "";

    console.log('contacts', contacts);
    

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Контакты</h2>

            <div className={styles.section_wrapper}>
                <div className={styles.iframe_wrapper}>
                    <iframe src="https://yandex.ru/map-widget/v1/?ll=131.925220%2C43.141841&mode=search&oid=1113538927&ol=biz&z=16.45" width="100%" height="100%"></iframe>
                </div>

                <div className={styles.info_block}>
                        <p className={styles.info_title}>Связаться с нами, получить расчет или задать вопрос</p>

                        <div className={styles.info_row}>
                            <span>Прямо сейчас:</span>
                            <SocialIcon href={normalizePhone(data?.phone || "")} type="phone" />
                            <SocialIcon href={data?.telegram || ""} type="telegram" />
                            <SocialIcon href={data?.max || ""} type="max" />
                        </div>

                        <div className={styles.info_row}>
                            <Image src="/icons/pin-icon.svg" alt="image" width={38} height={38} />
                            <div className={styles.info_address} dangerouslySetInnerHTML={{ __html: data?.address || "" }} />
                        </div>
                        <div className={styles.info_row}>
                            <SocialIcon href={normalizePhone(data?.phone || "")} type="phone" />
                            <a className={styles.info_phone} href={`tel:${normalizePhone(data?.phone || "")}`}>{data?.phone}</a>
                        </div>
                        <div className={styles.info_row}>
                            <SocialIcon href={normalizePhone(data?.phone_2 || "")} type="phone" />
                            <a className={styles.info_phone} href={`tel:${normalizePhone(data?.phone_2 || "")}`}>{data?.phone_2}</a>
                        </div>
                        <div className={styles.info_row}>
                            <SocialIcon href={data?.email || ""} type="email" />
                            <a className={styles.info_phone} href={`mailto:${data?.email || ""}`}>{data?.email}</a>
                        </div>
                </div>
            </div>
        </section>
    )
}