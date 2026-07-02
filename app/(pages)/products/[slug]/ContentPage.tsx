'use client';

import { useState } from "react";
import { Product } from "@/app/types/types";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import styles from './style.module.scss';

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

export default function ContentPage({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = useState(0);

    console.log('product', product);

    return (
        <div className={styles.wrapper}>

            <Swiper
                spaceBetween={20}
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                    el: '.product-pagination',
                }}
                className={styles.swiper}
            >
                {product?.images?.map((image, index) => {
                    const imageSrc = image.url
                        ? `${imageServer}${image.url}`
                        : "/placeholder.svg";

                    return (
                    <SwiperSlide key={image?.id ?? index} className={styles.swiper_slide}>
                        <div className={styles.image_wrapper}>
                            <Image
                                className={styles.slide}
                                src={imageSrc}
                                alt={"Изображение товара"}
                                fill
                                sizes="100vw"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                    );
                })}

                <div className={`product-pagination ${styles.custom_pagination}`} />
            </Swiper>

            <div className={styles.info}>
                <h1 className={styles.title}>{product?.title}</h1>
                <p className={styles.sku}>Арт. {product?.sku}</p>

                <div className={styles.tabs_wrapper}>
                    <div className={styles.tabs_buttons}>
                    <button className={`${styles.tab_button} ${activeTab === 0 ? styles.active : ''}`} onClick={() => setActiveTab(0)}>Описание</button>
                    <button className={`${styles.tab_button} ${activeTab === 1 ? styles.active : ''}`} onClick={() => setActiveTab(1)}>Характеристики</button>
                    <button className={`${styles.tab_button} ${activeTab === 2 ? styles.active : ''}`} onClick={() => setActiveTab(2)}>Условия применения</button>
                    </div>
                    <div className={`${styles.tab_content} ${activeTab === 0 ? styles.active : ''}`}>
                        <p className={styles.tab_content_text}>{product?.description}</p>
                    </div>
                    <div className={`${styles.tab_content} ${activeTab === 1 ? styles.active : ''}`}>
                        <ul className={styles.characteristic_list}>
                            {product?.characteristics?.map((characteristic, index) => {
                                return (
                                        <li key={index} className={styles.characteristic_item}>
                                            <span className={styles.characteristic_title}>{characteristic?.label}</span>
                                            <span className={styles.characteristic_value}>{characteristic?.value}</span>
                                        </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className={`${styles.tab_content} ${activeTab === 2 ? styles.active : ''}`}>
                        <div dangerouslySetInnerHTML={{ __html: product?.information ?? '' }} />
                    </div>
                </div>

            </div>

            <div className={styles.block}>
223222
            </div>
        </div>
    );
}