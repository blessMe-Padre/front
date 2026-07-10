import { WhyChoose, HomePromos, FormSection, Hero, HomeCategory } from "./sections";
import fetchData from "./utils/fetchData";

type HeroResponse = {
    data?: {
        slides?: HeroSlider[];
    }[];
};

type HeroSlider = {
    id: number;
    title: string;
    description: string;
    image: {
        url: string;
    };
};

export default async function Home() {

    const heroData = await fetchData<HeroResponse>(
        "/api/sekcziya-glavnyj-slajders?populate[slides][populate]=image"
    );
    const slides = heroData.data?.[0]?.slides ?? null;


    return (
        <div className="container">
            <Hero slides={slides} />
            <HomeCategory />
            <FormSection 
                background={1} 
                title="Не знаете, что выбрать?" 
                description="Оставьте заявку и мы подберем решение под вашу задачу с учетом условий эксплуатации, нагрузок и технологии производства" 
            />
            <WhyChoose />
            <HomePromos />
        </div>
    );
}
