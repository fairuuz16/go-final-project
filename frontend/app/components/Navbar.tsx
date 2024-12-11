"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";

const navs = [
    { name: "Orders", href: "/orders" },
    { name: "Check Out", href: "/checkout" },
]

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currentUser = useMemo(() => session?.user, [session]);
    const cartItems = useSelector((state: { cart: { cartItems: any[] } }) => state.cart.cartItems);

    const handleLogOut = async () => {
        await signOut();
    }

    return (
        <header className="bg-gray-900 max-w-screen-2xl mx-auto px-4 py-4">
            <nav className="flex justify-between items-center flex-wrap">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-white flex items-center">
                        <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>

                    {/* Books Link */}
                    <Link href="/books" className="text-white hidden sm:block mr-4">Books</Link>

                    {/* Search Bar */}
                    <div className="relative flex items-center w-full sm:w-72 md:w-96">
                        <input
                            type="text"
                            placeholder="Search Book"
                            className="bg-[#EAEAEA] w-full py-2 px-4 rounded-md focus:outline-none text-sm"
                        />
                        <IoSearchOutline
                            className="absolute right-3 text-gray-600 cursor-pointer"
                            size={20}
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* User Greeting */}
                    {currentUser && !currentUser?.is_admin && (
                        <span className="text-white text-sm mr-4">
                            Hi, {currentUser.name}!
                        </span>
                    )}

                    <div className="relative">
                        {currentUser && !currentUser?.is_admin ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <Image
                                        src="/assets/avatar.png"
                                        alt="User Avatar"
                                        width={30}
                                        height={30}
                                        className={`rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                                    />
                                </button>
                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navs.map((item) => (
                                                <li
                                                    key={item.name}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : currentUser && currentUser?.is_admin ? (
                            <Link href="/dashboard" className="text-white border-b-2 border-primary">Dashboard</Link>
                        ) : (
                            <Link href="/login">
                                <HiOutlineUser className="text-white size-6" />
                            </Link>
                        )}
                    </div>

                    {/* Cart Icon */}
                    <Link
                        href="/cart"
                        className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
                    >
                        <HiOutlineShoppingCart className="text-white" size={24} />
                        {cartItems.length > 0 ? (
                            <span className="text-sm font-semibold text-white ml-2">{cartItems.length}</span>
                        ) : (
                            <span className="text-sm font-semibold text-white ml-2">0</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
