import JsonLd from "@/components/JsonLd";
import Map from "./components/Map";
import OurDetals from "./components/OurDetals";
import SendMessage from "./components/SendMessage";

export default function ContactUs() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Fitrock",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.NEXT_PUBLIC_FRONT_END_URL + "/contact-us",
        }}
      />
      <div className="px-4 lg:px-12">
        <h1 className="text-3xl font-bold py-3 mt-3">Contact Us</h1>

        <div className="w-full grid gap-8 items-stretch grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-1">
            <SendMessage />
          </div>

          <div className="col-span-1">
            <OurDetals />
          </div>

          <div className="w-full col-span-1 md:col-span-2 xl:col-span-1">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}
