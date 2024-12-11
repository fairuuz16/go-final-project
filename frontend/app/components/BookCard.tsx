"use client";

import React from 'react';
import { FiPenTool, FiShoppingCart } from 'react-icons/fi';
import Link from "next/link";
import { Book } from "@/app/types/book.type";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { addToCart } from "@/app/store/reducers/cart/cartSlice";

interface BookCardProps {
    book: Book;
    canEdit: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, canEdit }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (book: Book) => {
        dispatch(addToCart(book));
    };

    const getImgUrl = () => {
        return `${process.env.BACKEND_BASE_URL}/${book.cover_image}`;
    };

    return (
        <div className="rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl p-4 bg-white hover:scale-105 transform">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-6">
                <div className="w-30 h-60 sm:flex-shrink-0 border rounded-lg overflow-hidden shadow-md">
                    <Link href={`/books/${book.id}`}>
                        <Image
                            src={getImgUrl()}
                            alt="book"
                            className="w-full h-full object-cover rounded-lg transform transition duration-300 hover:scale-110"
                            height={300}
                            width={200}
                            priority={true}
                        />
                    </Link>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                    <Link href={`/books/${book.id}`}>
                        <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {book.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3">
                        {book.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}
                    </p>
                    <p className="font-medium text-lg text-green-600 mb-3">
                        ${book.new_price} <span className="line-through text-sm text-gray-500 ml-2">$ {book.old_price}</span>
                    </p>
                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn-primary px-6 py-2 space-x-1 flex items-center gap-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 text-sm">
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                    {canEdit && (
                        <Link
                            href={`/dashboard/manage-books/edit/${book.id}`}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm transition duration-300">
                            <FiPenTool />
                            <span>Edit</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
