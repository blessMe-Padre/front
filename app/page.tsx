import { WhyChoose, HomePromos, FormSection } from "./sections";

export default async function Home() {
    return (
        <div className="container">
            {/* <Hero slides={slides} /> */}
            {/* <HomeCategory /> */}
            <FormSection 
                background={1} 
                title="Не знаете, что выбрать?" 
                description="Оставьте заявку и мы подберем решение под вашу задачу с учетом условий эксплуатации, нагрузок и технологии производства" 
            />
            <HomePromos />
            <WhyChoose />
        </div>
    );
}
