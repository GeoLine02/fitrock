import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">This Page does not exist</h1>
      <Link href={"/"}>
        <button className="font-medium cursor-pointer p-4 px-6 text-white bg-customOrange rounded-xl">
          Back to Home page
        </button>
      </Link>
    </div>
  );
}
