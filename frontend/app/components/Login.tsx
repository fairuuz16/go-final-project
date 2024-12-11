"use client";

import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import { toast } from "react-toastify";
import httpStatus from "@/app/lib/http-status";

const Login = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    interface FormData {
        email: string;
        password: string;
    }

    const onSubmit = async (data: FormData) => {
        const result: SignInResponse | undefined = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (result?.status === httpStatus.UNAUTHORIZED) {
            setMessage("Invalid credentials");
        } else {
            toast.success("Logged in successfully");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    const handleGoogleSignIn = async () => {
        console.log("Google Sign In");
    };

    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-50">
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login to Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none transition duration-200"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-md focus:outline-none flex items-center justify-center gap-2"
                        >
                            <FaGoogle />
                            Login with Google
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:text-blue-700">
                        Register here
                    </Link>
                </p>

                <p className="text-center text-xs text-gray-500 mt-6">
                    ©2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
