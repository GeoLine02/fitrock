import Map from "./components/Map";
import OurDetals from "./components/OurDetals";
import SendMessage from "./components/SendMessage";

export default function ContactUs() {
  return (
    <div className="px-12">
      <h1 className="text-3xl font-bold py-3 mt-3">Contact Us</h1>

      <div className="flex gap-8 w-full items-start">
        <SendMessage />
        <OurDetals />
        <Map />
      </div>
    </div>
  );
}
