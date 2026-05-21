import Image from "next/image";
import fetchData from "./utils/fetchData";
import { StrapiSingleResponse, Contact } from "./types/types";
import { Hero, MockSection } from "./sections";

export default async function Home() {
  // const contacts = await fetchData<StrapiSingleResponse<Contact>>("/api/kontakty");
  // console.log("contacts", contacts.data);

  return (
    <div className="container">
      <Hero />
      <MockSection />
      <MockSection />
      <MockSection />
    </div>
  );
}
