import type { Metadata } from "next";
import "../globals.css";
import React, { Suspense } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ReduxProvider from "@/app/components/ReduxProvider";
import Preloader from "@/app/components/Preloader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "@/app/components/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const session = await getServerSession(authOptions);

    return (
        <NextAuthProvider session={session}>
            <html lang="en">
            <body>
            <ReduxProvider>
                <Navbar/>
                <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
                    <Suspense fallback={<Preloader/>}>

                        {children}
                    </Suspense>
                </main>
            </ReduxProvider>
            <ToastContainer/>
            <Footer/>
            </body>
            </html>
        </NextAuthProvider>
    );
}
