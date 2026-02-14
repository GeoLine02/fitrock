"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import Button from "@/components/Button";
import { LoginUserInput, loginUserSchema } from "../validators";
import { signIn } from "../services/sigin";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginUserInput) => {
    try {
      const res = await signIn(data);

      if (res.success) {
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError("root", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-95 bg-neutral-800 p-6 rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Sign in
      </h1>

      {/* Email */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          autoComplete="username"
          className="w-full bg-transparent border-b border-neutral-500 py-2 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          autoComplete="new-password"
          className="w-full bg-transparent border-b border-neutral-500 py-2 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 mt-4 p-3">
          <p className="text-red-400 text-sm text-center">
            {errors.root.message}
          </p>
        </div>
      )}

      <Button
        bgColor="orange"
        classname="w-full font-medium"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <ClipLoader size={25} /> : "Sign in"}
      </Button>

      <p className="text-white flex justify-between text-sm mt-3">
        Don&apos;t have account?
        <Link
          href="/sign-up"
          className="text-[#E47C48] cursor-pointer underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
