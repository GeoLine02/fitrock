import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-7xl font-bold tracking-tight text-customOrange md:text-8xl">
        404
      </p>
      <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">
        This page does not exist
      </h1>
      <p className="max-w-md text-sm text-gray-500">
        The page you&apos;re looking for may have been moved, renamed, or never
        existed.
      </p>
      <Link href={"/"}>
        <button className="inline-flex items-center gap-2 rounded-lg bg-customOrange px-6 py-3 font-medium text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md active:translate-y-px">
          <ArrowLeft size={16} />
          Back to Home page
        </button>
      </Link>
    </div>
  );
}
