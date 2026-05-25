'use client';

import Image from "next/image";
import styles from "./style.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER;

export default function Hero({ slides }: HeroProps) {

   
    return (
        <section className={styles.hero}>
            <h2 className="visually-hidden">{slides?.[0]?.title ?? "Композитные материалы для производства, судостроения и промышленности"}</h2>
            <Swiper
                spaceBetween={20}
                modules={[Pagination]}
                navigation={{
                    nextEl: '.custom-navigation .swiper-button-next',
                    prevEl: '.custom-navigation .swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                className={styles.swiper}
            >
                {slides && slides.length > 0 && slides.map((slide) => {
                    const imageSrc = slide.image?.url
                        ? `${imageServer}${slide.image.url}`
                        : "/placeholder.svg";

                    return (
                    <SwiperSlide key={slide.id}>
                        <div className={styles.hero_item}>
                            <h2 className={styles.hero_title}>{slide.title}</h2>
                            <p className={styles.hero_description}>{slide.descriptions}</p>
                            <div className={styles.hero_image}>
                                <Image
                                    className={styles.slide}
                                    src={imageSrc}
                                    alt={slide.title ?? "Слайд"}
                                    width={1440}
                                    height={427}
                                    sizes="100vw"
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                                    priority
                                />
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
