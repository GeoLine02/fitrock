import Button from "@/components/Button";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <form className="w-95 bg-neutral-800 p-6 rounded-sm shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Sign up</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        <input
          type="password"
          placeholder="password"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <Button
          classname="w-full font-medium text-white rounded-md"
          label="Sign up"
        />
        <p className="text-white flex justify-between text-sm mt-3">
          already have an account ?{" "}
          <Link
            href={"/sign-in"}
            className="text-amber-600 cursor-pointer underline"
          >
            Sign In{" "}
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
