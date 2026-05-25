"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import Button from "@/components/Button";

import { z } from "zod";
import { signup } from "../services/signup";
import { registerUserSchema } from "../validators";
import { ClipLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/providers/UserProvider";
import { Dumbbell, Lock, Mail, Phone, User } from "lucide-react";

type RegisterFormValues = z.infer<typeof registerUserSchema>;

function safeRedirectTarget(value: string | null) {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerUserSchema),
  });

  const router = useRouter();
  const { setUser } = useUser();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirectTarget(searchParams.get("redirectTo"));

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await signup({
        fullName: data.full_name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phone_number,
      });

      if (res.success) {
        setUser(res.data.user);
        router.push(redirectTo);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.message;
      if (errorMessage === "Email already exists") {
        setError("email", {
          message: errorMessage,
        });
        return;
      }

      setError("root", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="w-[22rem] rounded-2xl bg-neutral-900/90 p-7 shadow-2xl backdrop-blur-sm ring-1 ring-white/10"
    >
      <div className="mb-6 flex flex-col items-center">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-customOrange text-white shadow-lg">
          <Dumbbell size={22} strokeWidth={2.5} />
        </span>
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-1 text-sm text-gray-400">Join Tsona today</p>
      </div>

      {/* Full name */}
      <div className="mb-4">
        <div className="relative">
          <User
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Name"
            {...register("full_name")}
            className="w-full border-b border-neutral-700 bg-transparent py-2 pl-6 text-white placeholder-gray-500 outline-none transition-colors focus:border-customOrange"
          />
        </div>
        {errors.full_name && (
          <p className="mt-1 text-xs text-red-400">
            {errors.full_name.message}
          </p>
        )}
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
            autoComplete="username"
            {...register("email")}
            className="w-full border-b border-neutral-700 bg-transparent py-2 pl-6 text-white placeholder-gray-500 outline-none transition-colors focus:border-customOrange"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Phone number (optional) */}
      <div className="mb-4">
        <div className="relative">
          <Phone
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Phone"
            inputMode="numeric"
            {...register("phone_number")}
            className="w-full border-b border-neutral-700 bg-transparent py-2 pl-6 text-white placeholder-gray-500 outline-none transition-colors focus:border-customOrange"
          />
        </div>
        {errors.phone_number && (
          <p className="mt-1 text-xs text-red-400">
            {errors.phone_number.message}
          </p>
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
            autoComplete="new-password"
            {...register("password")}
            className="w-full border-b border-neutral-700 bg-transparent py-2 pl-6 text-white placeholder-gray-500 outline-none transition-colors focus:border-customOrange"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        bgColor="orange"
        classname="w-full justify-center font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Sign up"}
      </Button>

      {/* Root error */}
      {errors.root && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-center text-sm text-red-400">
            {errors.root.message}
          </p>
        </div>
      )}

      <p className="mt-4 flex justify-between text-sm text-gray-300">
        Already have an account?
        <Link
          href="/sign-in"
          className="font-medium text-customOrange transition-colors hover:text-orange-400 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
