"use client";

import React from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "next/navigation";
import { addToCart } from "@/app/store/reducers/cart/cartSlice";
import { useGetBookQuery } from "@/app/store/reducers/books/booksApi";
import { FiShoppingCart } from 'react-icons/fi';

interface Props {}

const SingleBook: React.FC<Props> = () => {
    const {id} = useParams();
    const {data, isLoading, isError} = useGetBookQuery(Number(id));
    const book = data?.data || {};

    const dispatch = useDispatch();

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div className="text-center text-lg">Loading...</div>;

    if (isError) return <div className="text-center text-lg text-red-500">Error loading book info</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 my-10 transition-all duration-300 transform hover:scale-105">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{book.title}</h1>

            <div className="flex flex-col sm:flex-row gap-8">
                {/* Gambar Buku */}
                <div className="sm:w-1/3">
                    <img
                        src={`${process.env.BACKEND_BASE_URL}/${book.cover_image}`}
                        alt={book.title}
                        className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-all duration-300"
                    />
                </div>

                {/* Deskripsi Buku */}
                <div className="sm:w-2/3">
                    <div className="mb-5">
                        <p className="text-gray-700 mb-4">
                            <strong className="font-semibold">Published:</strong>{" "}
                            {new Date(book?.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-4 capitalize">
                            <strong className="font-semibold">Category:</strong> {book?.category}
                        </p>
                        <p className="text-gray-700 mb-6">
                            <strong className="font-semibold">Description:</strong> {book.description}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="btn-primary px-6 py-2 bg-blue-600 text-white rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:bg-blue-700"
                        >
                            <FiShoppingCart />
                            <span>Add to Cart</span>
                        </button>

                        {/* Price Section */}
                        <div className="text-lg font-semibold text-gray-800">
                            ${book.new_price}
                            <span className="text-sm text-gray-500 line-through ml-2">
                                ${book.old_price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;
