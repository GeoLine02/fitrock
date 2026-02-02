"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import Button from "@/components/Button";

import { z } from "zod";
import { signup } from "../services/signup";
import { registerUserSchema } from "../validators";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

type RegisterFormValues = z.infer<typeof registerUserSchema>;

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

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await signup({
        fullName: data.full_name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phone_number || "",
      });

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
      autoComplete="off"
      className="w-95 bg-neutral-800 p-6 rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Sign up
      </h1>

      {/* Full name */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          {...register("full_name")}
          className="w-full bg-transparent border-b border-neutral-500 py-2 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        {errors.full_name && (
          <p className="text-red-400 text-sm mt-1">
            {errors.full_name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          autoComplete="username"
          {...register("email")}
          className="w-full bg-transparent border-b border-neutral-500 py-2 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone number (optional) */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Phone"
          inputMode="numeric"
          {...register("phone_number")}
          className="w-full bg-transparent border-b border-neutral-500 py-2 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        {errors.phone_number && (
          <p className="text-red-400 text-sm mt-1">
            {errors.phone_number.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          {...register("password")}
          className="w-full bg-transparent border-b border-neutral-500 py-2 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        bgColor="orange"
        classname="w-full font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? <ClipLoader size={25} /> : "Sign up"}
      </Button>

      {/* Root error */}
      {errors.root && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 mt-4">
          <p className="text-red-400 text-sm text-center">
            {errors.root.message}
          </p>
        </div>
      )}

      <p className="text-white flex justify-between text-sm mt-3">
        Already have an account?
        <Link
          href="/sign-in"
          className="text-customOrange cursor-pointer underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
