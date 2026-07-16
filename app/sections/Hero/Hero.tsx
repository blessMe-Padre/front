'use client';

import Image from "next/image";
import styles from "./style.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import { usePopupStore } from "@/app/store/popupStore";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export type HeroSlider = {
    id: number;
    title?: string;
    descriptions?: string;
    image?: {
        url?: string | null;
    } | null;
};

type HeroProps = {
    slides: HeroSlider[] | null;
};

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";
const BLUR_DATA_URL_10PX =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjY2NjIi8+PC9zdmc+";

export default function Hero({ slides }: HeroProps) {
    const { togglePopupState } = usePopupStore();

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <section className={styles.hero}>
            <h2 className="visually-hidden">{slides?.[0].title ?? "Композитные материалы для производства, судостроения и промышленности"}</h2>
            <Swiper
                spaceBetween={20}
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                loop={true}
                slidesPerView={1}
                className={styles.swiper}
            >
                {slides.map((slide, index) => {
                    const imageSrc = slide.image?.url
                        ? `${imageServer}${slide.image.url}`
                        : "/placeholder.svg";

                    return (
                    <SwiperSlide key={slide.id}>
                        <div className={styles.hero_item}>
                            <div className={styles.hero_image}>
                                <Image
                                    src={imageSrc}
                                    alt={slide.title ?? "Главный слайд"}
                                    fill
                                    sizes="100vw"
                                    placeholder={index === 0 ? "blur" : "empty"}
                                    blurDataURL={index === 0 ? BLUR_DATA_URL_10PX : undefined}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                />
                            </div>

                            <div className={styles.hero_item_content}>
                                <p className={styles.hero_title}>{slide.title}</p>
                                <div dangerouslySetInnerHTML={{ __html: slide.descriptions ?? "" }} className={styles.hero_description} />
                            </div>

                            <div className={styles.hero_button_wrapper}>
                                <div className={styles.hero_button}>
                                    <span>для тех, кто знает, что ищет</span>
                                    <Link href="/catalog" className="button_primary">В каталог</Link>
                                </div>
                                <div className={styles.hero_button}>
                                    <span>если нужна помощь специалиста</span>
                                    <button type="button" onClick={togglePopupState} className="button_ghost">Подобрать материалы</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    );
                })}

                <div className={`custom-pagination ${styles.custom_pagination}`} />
            </Swiper>
        </section>
    );
}
