import "../globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { permanentRedirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { NextAuthProvider } from "@/app/components/NextAuthProvider";
import ReduxProvider from "@/app/components/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { authOptions } from "@/app/lib/authOptions";
import Link from "next/link";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import LogoutButton from "@/app/components/admin/LogoutButton";
import Preloader from "@/app/components/Preloader";
import { LuAppWindow } from "react-icons/lu";

interface Props {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
    const session = await getServerSession(authOptions);
    if (!session) permanentRedirect('/login');

    return (
        <NextAuthProvider session={session}>
            <html lang="en">
                <body>
                    <Suspense fallback={<Preloader />}>
                        <ReduxProvider>
                            <section className="flex min-h-screen bg-gray-100">
                                {/* Sidebar */}
                                <aside className="hidden sm:flex sm:flex-col">
                                    <a href="/"
                                    className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500">
                                        <img src="/assets/fav-icon.png" alt=""/>
                                    </a>
                                    <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
                                        <nav className="flex flex-col mx-4 my-6 space-y-4">
                                            <Link href="/dashboard"
                                                className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                                                <span className="sr-only">Dashboard</span>
                                                <LuAppWindow className="h-6 w-6"/>
                                            </Link>
                                            <Link href="/dashboard/add-new-book"
                                                className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                                                <span className="sr-only">Add Book</span>
                                                <HiViewGridAdd className="h-6 w-6"/>
                                            </Link>
                                            <Link href="/dashboard/manage-books"
                                                className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                                                <span className="sr-only">Manage Books</span>
                                                <MdOutlineManageHistory className="h-6 w-6"/>
                                            </Link>
                                        </nav>
                                    </div>
                                </aside>
                                {/* <aside className="hidden sm:flex sm:flex-col bg-gray-800 text-gray-500 w-16 sm:w-64 p-4">
                                    <div className="flex items-center justify-center mb-8">
                                        <a href="/" className="inline-flex items-center justify-center h-16 w-16 bg-purple-600 hover:bg-purple-500 rounded-full">
                                            <img src="/assets/fav-icon.png" alt="Logo" />
                                        </a>
                                    </div>
                                    <nav className="flex flex-col space-y-4">
                                        <Link href="/dashboard" className="flex items-center justify-start py-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                                            <LuAppWindow className="h-6 w-6 mr-3" /> 
                                            Dashboard
                                        </Link>
                                        <Link href="/dashboard/add-new-book" className="flex items-center justify-start py-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                                            <HiViewGridAdd className="h-6 w-6 mr-3" />
                                            Add Book
                                        </Link>
                                        <Link href="/dashboard/manage-books" className="flex items-center justify-start py-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                                            <MdOutlineManageHistory className="h-6 w-6 mr-3" />
                                            Manage Books
                                        </Link>
                                    </nav>
                                    <div className="mt-auto border-t border-gray-700 pt-4">
                                        <LogoutButton />
                                    </div>
                                </aside> */}

                                {/* Main Content */}
                                <div className="flex-grow p-6 sm:px-10 bg-white">
                                    <header className="flex items-center justify-between mb-6 bg-white shadow-md px-6 py-4">
                                        <button className="sm:hidden p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                            </svg>
                                        </button>
                                        <div className="text-gray-800 font-semibold text-lg">Dashboard</div>
                                    </header>

                                    {/* Main Content Area */}
                                    <div className="content-area">
                                        {children}
                                    </div>
                                </div>
                            </section>
                        </ReduxProvider>
                    </Suspense>
                    <ToastContainer />
                </body>
            </html>
        </NextAuthProvider>
    );
};

export default DashboardLayout;