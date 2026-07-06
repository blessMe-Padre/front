import Image from "next/image";
import fetchData from "./utils/fetchData";
import { StrapiSingleResponse, Contact } from "./types/types";
import type { HeroSlider } from "./sections/Hero/Hero";
import { Hero, WhyChoose, HomeCategory } from "./sections";

type HeroResponse = {
    data?: {
        slides?: HeroSlider[];
    }[];
};

export default async function Home() {
    // const contacts = await fetchData<StrapiSingleResponse<Contact>>("/api/kontakty");
    // console.log("contacts", contacts.data);

    const heroData = await fetchData<HeroResponse>(
        "/api/sekcziya-glavnyj-slajders?populate[slides][populate]=image"
    );
    const slides = heroData.data?.[0]?.slides ?? null;

    return (
        <div className="container">
            <Hero slides={slides} />
            <HomeCategory />
            <WhyChoose />
        </div>
    );
}
