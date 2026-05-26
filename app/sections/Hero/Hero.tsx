'use client';

import Image from "next/image";
import styles from "./style.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";

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
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                className={styles.swiper}
            >
                {slides && slides.map((slide, index) => {
                    const imageSrc = slide.image?.url
                        ? `${imageServer}${slide.image.url}`
                        : "/placeholder.svg";

                    return (
                    <SwiperSlide key={slide.id}>
                        <div className={styles.hero_item}>
                            <p className={styles.hero_title}>{slide.title}</p>
                            <p className={styles.hero_description}>{slide.descriptions}</p>
                            <div className={styles.hero_image}>
                                <Image
                                    className={styles.slide}
                                    src={imageSrc}
                                    alt={slide.title ?? "Слайд"}
                                    fill
                                    sizes="100vw"
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+"
                                    loading="eager"
                                    fetchPriority={index === 0 ? "high" : "auto"}
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
