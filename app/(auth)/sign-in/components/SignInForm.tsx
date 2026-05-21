"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import Button from "@/components/Button";
import { LoginUserInput, loginUserSchema } from "../validators";
import { signIn } from "../services/sigin";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserProvider";
import { Dumbbell, Lock, Mail } from "lucide-react";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const { setUser } = useUser();
  const router = useRouter();

  const onSubmit = async (data: LoginUserInput) => {
    try {
      const res = await signIn(data);

      if (res.success) {
        setUser(res.data.user);
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
      className="w-[22rem] rounded-2xl bg-neutral-900/90 p-7 shadow-2xl backdrop-blur-sm ring-1 ring-white/10"
    >
      <div className="mb-6 flex flex-col items-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-customOrange text-white shadow-lg">
          <Dumbbell size={22} strokeWidth={2.5} />
        </span>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-400">Sign in to continue</p>
      </div>

      {/* Email */}
      <div className="mb-4">
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            autoComplete="username"
            className="w-full border-b border-neutral-700 bg-transparent py-2 pl-6 text-white placeholder-gray-500 outline-none transition-colors focus:border-customOrange"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-5">
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            autoComplete="new-password"
            className="w-full border-b border-neutral-700 bg-transparent py-2 pl-6 text-white placeholder-gray-500 outline-none transition-colors focus:border-customOrange"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-center text-sm text-red-400">
            {errors.root.message}
          </p>
        </div>
      )}

      <Button
        bgColor="orange"
        classname="w-full justify-center font-medium"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Sign in"}
      </Button>

      <p className="mt-4 flex justify-between text-sm text-gray-300">
        Don&apos;t have account?
        <Link
          href="/sign-up"
          className="font-medium text-customOrange transition-colors hover:text-orange-400 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
