import fetchData from "./utils/fetchData";
import type { HeroSlider } from "./sections/Hero/Hero";
import { Hero, WhyChoose, HomeCategory } from "./sections";

type HeroResponse = {
    data?: {
        slides?: HeroSlider[];
    }[];
};

export default async function Home() {
    const heroData = await fetchData<HeroResponse>(
        "/api/sekcziya-glavnyj-slajders?populate[slides][populate]=image"
    );
    const slides = heroData.data?.[0]?.slides ?? null;

    return (
        <div className="container">
            <Hero slides={slides} />
            {/* <HomeCategory /> */}
            {/* <WhyChoose /> */}
        </div>
    );
}
