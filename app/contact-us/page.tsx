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
              : process.env.NEXT_PUBLIC_URL + "/contact-us",
        }}
      />
      <div className="px-4 py-8 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-customOrange">
            Get in touch
          </p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="mt-2 max-w-xl text-sm text-gray-600">
            Have a question, request, or feedback? Drop us a message and we'll
            get back to you shortly.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-1">
            <SendMessage />
          </div>

          <div className="col-span-1">
            <OurDetals />
          </div>

          <div className="col-span-1 w-full md:col-span-2 xl:col-span-1">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}
