import Button from "@/components/Button";
import Link from "next/link";

export default function SignIn() {
  return (
    <div
      className="min-h-screen w-screen 
  flex items-center justify-center
  bg-[url('/Fitrock-assets/imgs/sign-background2.png')]
  bg-cover bg-center bg-no-repeat
"
    >
      <form className="w-95 bg-neutral-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Sign in</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <input
          type="password"
          placeholder="password"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <Button bgColor="orange" classname="w-full font-medium">
          Sign in
        </Button>

        <p className="text-white flex justify-between text-sm mt-3">
          Don&apos;t have account ?{" "}
          <Link
            href={"/sign-up"}
            className="text-[#E47C48] cursor-pointer underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
