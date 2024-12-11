"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    interface FormData {
        name: string;
        email: string;
        password: string;
    }

    interface ApiResponse {
        message?: string;
    }

    const onSubmit = async (data: FormData) => {
        setMessage("");
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
            });

            if (!response.ok) {
                const data: ApiResponse = await response.json();
                setMessage(data.message || 'Something went wrong');
            } else {
                const data: ApiResponse = await response.json();
                setMessage('');
                toast.success("Signup was successful");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred');
        }
    }

    const handleGoogleSignIn = async () => {
        console.log("Google Sign In");
    }

    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-50">
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Create a New Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-medium mb-2"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your full name"
                            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-medium mb-2"
                            htmlFor="email"
                        >
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

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-medium mb-2"
                            htmlFor="password"
                        >
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

                    {message && (
                        <p className="text-red-500 text-xs italic mb-3">{message}</p>
                    )}

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none transition duration-200"
                        >
                            Register
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-md focus:outline-none flex items-center justify-center gap-2"
                        >
                            <FaGoogle />
                            Sign Up with Google
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700">
                        Login
                    </Link>
                </p>

                <p className="text-center text-xs text-gray-500 mt-6">
                    ©2024 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Register;
