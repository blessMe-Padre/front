'use client';

import { useState } from "react";
import { Product } from "@/app/types/types";
import Image from "next/image";
import useCartStore from "@/app/store/cartStore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import styles from './style.module.scss';
import Link from "next/link";

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

export default function ContentPage({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const cartItem = useCartStore((state) => state.cartItems.find((item) => item.id === product.id));
    const currentQuantity = cartItem?.quantity ?? quantity;

    const handleIncreaseQuantity = () => {
        if (cartItem) {
            increaseQuantity(product.id);
            return;
        }

        setQuantity((value) => value + 1);
    };

    const handleDecreaseQuantity = () => {
        if (cartItem) {
            decreaseQuantity(product.id);
            return;
        }

        setQuantity((value) => Math.max(1, value - 1));
    };

    const handleAddToCart = () => {
        if (cartItem) {
            addToCart(product);
            return;
        }

        Array.from({ length: quantity }).forEach(() => addToCart(product));
    };

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
                <div className={styles.info_header}>
                    <h1 className={styles.title}>{product?.title}</h1>
                    {product?.sku && <p className={styles.sku}>Арт. {product?.sku}</p>}
                </div>

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
                <div className={styles.counter_block}>
                    <p className={styles.price}>{product?.price?.toLocaleString('ru-RU')}₽</p>
                    <div className={styles.counter_wrapper}>
                        <button type="button" onClick={handleDecreaseQuantity} className={styles.counter_button} title="уменьшить количество">
                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.0833 1.58333H0V0H11.0833V1.58333Z" fill="black" />
                            </svg>
                        </button>
                        <span>{currentQuantity}</span>
                        <button type="button" onClick={handleIncreaseQuantity} className={styles.counter_button} title="увеличить количество">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.0833 6.33333H6.33333V11.0833H4.75V6.33333H0V4.75H4.75V0H6.33333V4.75H11.0833V6.33333Z" fill="black" />
                            </svg>
                        </button>
                    </div>

                    <button 
                        type="button" 
                        onClick={handleAddToCart} 
                        className={`${styles.add_to_cart_button} button_primary`}
                    >Добавить в корзину</button>
                </div>

                <div className={styles.delivery_block}>
                    <p className={styles.delivery_title}>Доставка</p>
                    <div className={styles.delivery_item}>
                        <p className={styles.delivery_label}>самовывоз со склада</p>
                        <Link href="/dostavka-i-oplata" className={styles.delivery_row}>
                            <div className={styles.delivery_icon_wrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.45 20.281C16.122 17.162 19.5 13.218 19.5 9.671C19.5 5.435 16.142 2 12 2C7.858 2 4.5 5.435 4.5 9.671C4.5 13.218 7.878 17.162 10.55 20.281C11.07 20.889 11.564 21.464 12 22C12.436 21.464 12.93 20.889 13.45 20.281ZM12 12C12.3611 12 12.7187 11.9289 13.0524 11.7907C13.386 11.6525 13.6892 11.4499 13.9445 11.1945C14.1999 10.9392 14.4025 10.636 14.5407 10.3024C14.6789 9.96873 14.75 9.61114 14.75 9.25C14.75 8.88886 14.6789 8.53127 14.5407 8.19762C14.4025 7.86398 14.1999 7.56082 13.9445 7.30546C13.6892 7.0501 13.386 6.84753 13.0524 6.70933C12.7187 6.57113 12.3611 6.5 12 6.5C11.2707 6.5 10.5712 6.78973 10.0555 7.30546C9.53973 7.82118 9.25 8.52065 9.25 9.25C9.25 9.97935 9.53973 10.6788 10.0555 11.1945C10.5712 11.7103 11.2707 12 12 12Z" fill="black" />
                                </svg>
                                <span className={styles.delivery_text}>Владивосток, Днепровская 21в</span>
                            </div>
                            <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.1569 12.711L4.49994 18.368L3.08594 16.954L8.03594 12.004L3.08594 7.05401L4.49994 5.64001L10.1569 11.297C10.3444 11.4845 10.4497 11.7389 10.4497 12.004C10.4497 12.2692 10.3444 12.5235 10.1569 12.711Z" fill="black" />
                            </svg>
                        </Link>
                    </div>
                    <div className={styles.delivery_item}>
                        <p className={styles.delivery_label}>Доставка по РФ</p>
                        <Link href="/dostavka-i-oplata" className={styles.delivery_row}>
                            <div className={styles.delivery_icon_wrapper}>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.41163e-07 1C1.41163e-07 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H12C12.2652 0 12.5196 0.105357 12.7071 0.292893C12.8946 0.48043 13 0.734784 13 1V6H17C17.6566 6 18.3068 6.12933 18.9134 6.3806C19.52 6.63188 20.0712 7.00017 20.5355 7.46447C20.9998 7.92876 21.3681 8.47996 21.6194 9.08658C21.8707 9.69321 22 10.3434 22 11V15C22.0003 15.6438 21.7934 16.2706 21.41 16.7878C21.0266 17.305 20.4871 17.6851 19.871 17.872C19.6876 18.477 19.3178 19.0086 18.8143 19.3909C18.3108 19.7732 17.6994 19.9867 17.0674 20.0009C16.4353 20.0151 15.815 19.8293 15.2948 19.4699C14.7747 19.1106 14.3814 18.5962 14.171 18H7.83C7.61962 18.5962 7.22629 19.1106 6.70616 19.4699C6.18602 19.8293 5.56566 20.0151 4.93363 20.0009C4.3016 19.9867 3.69021 19.7732 3.18673 19.3909C2.68324 19.0086 2.3134 18.477 2.13 17.872C1.51376 17.6853 0.973947 17.3052 0.590369 16.788C0.206792 16.2708 -0.000197331 15.6439 1.41163e-07 15V11H6C6.26522 11 6.51957 10.8946 6.70711 10.7071C6.89464 10.5196 7 10.2652 7 10C7 9.73478 6.89464 9.48043 6.70711 9.29289C6.51957 9.10536 6.26522 9 6 9H1.41163e-07V7H4C4.26522 7 4.51957 6.89464 4.70711 6.70711C4.89464 6.51957 5 6.26522 5 6C5 5.73478 4.89464 5.48043 4.70711 5.29289C4.51957 5.10536 4.26522 5 4 5H1.41163e-07V1ZM13 16H14.171C14.3687 15.4404 14.7279 14.9521 15.2032 14.5967C15.6785 14.2414 16.2485 14.0349 16.8411 14.0036C17.4337 13.9722 18.0223 14.1173 18.5325 14.4205C19.0426 14.7237 19.4513 15.1714 19.707 15.707C19.8946 15.5195 19.9999 15.2652 20 15V11C20 10.2044 19.6839 9.44129 19.1213 8.87868C18.5587 8.31607 17.7956 8 17 8H13V16ZM6 17C6 16.7348 5.89464 16.4804 5.70711 16.2929C5.51957 16.1054 5.26522 16 5 16C4.73478 16 4.48043 16.1054 4.29289 16.2929C4.10536 16.4804 4 16.7348 4 17C4 17.2652 4.10536 17.5196 4.29289 17.7071C4.48043 17.8946 4.73478 18 5 18C5.26522 18 5.51957 17.8946 5.70711 17.7071C5.89464 17.5196 6 17.2652 6 17ZM16.293 16.293C16.1054 16.4805 16.0001 16.7348 16 17C16 17.2314 16.0801 17.4556 16.2269 17.6344C16.3736 17.8133 16.5778 17.9358 16.8047 17.981C17.0316 18.0261 17.2672 17.9912 17.4712 17.8822C17.6753 17.7732 17.8352 17.5968 17.9238 17.3831C18.0124 17.1693 18.0241 16.9315 17.957 16.7101C17.8899 16.4887 17.7481 16.2974 17.5557 16.1688C17.3634 16.0403 17.1324 15.9824 16.9021 16.005C16.6719 16.0277 16.4566 16.1294 16.293 16.293Z" fill="black" />
                                </svg>
                                <span className={styles.delivery_text}>Транспортной компанией</span>
                            </div>
                            <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.1569 12.711L4.49994 18.368L3.08594 16.954L8.03594 12.004L3.08594 7.05401L4.49994 5.64001L10.1569 11.297C10.3444 11.4845 10.4497 11.7389 10.4497 12.004C10.4497 12.2692 10.3444 12.5235 10.1569 12.711Z" fill="black" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}