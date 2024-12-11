"use client";

import { clearCart, removeFromCart } from "@/app/store/reducers/cart/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link";

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    // Perbaikan: pastikan semua harga valid (parseFloat)
    const totalPrice = cartItems.reduce((acc, item) => {
        const itemPrice = parseFloat(item.new_price) || 0;  // Pastikan harga valid
        return acc + itemPrice;
    }, 0).toFixed(2); // Format angka dengan 2 decimal places

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <>
            <div className="flex mt-12 h-full flex-col bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="text-2xl font-semibold text-gray-900">Shopping Cart</div>
                        <div className="ml-3 flex h-7 items-center ">
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="relative py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">
                            {
                                cartItems.length > 0 ? (
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {
                                            cartItems.map((book) => (
                                                <li key={book?.id} className="flex py-6 hover:bg-gray-50 transition-all duration-200">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                                        <img
                                                            alt={book?.title}
                                                            src={`${process.env.BACKEND_BASE_URL}/` + book?.cover_image}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <Link href="/">{book?.title}</Link>
                                                            </h3>
                                                            <p className="text-gray-700">${book?.new_price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500"><strong>Category: </strong>{book?.category}</p>
                                                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm mt-2">
                                                            <p className="text-gray-500"><strong>Qty:</strong> 1</p>
                                                            <button
                                                                onClick={() => handleRemoveFromCart(book)}
                                                                type="button"
                                                                className="font-medium text-red-600 hover:text-red-500 transition duration-200"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ) : (
                                    <p className="text-center text-gray-500">No book found in your cart!</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-6 sm:px-6 bg-gray-50">
                    <div className="flex justify-between text-lg font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>  {/* Pastikan subtotal ditampilkan dengan benar */}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

                    <div className="mt-6">
                        <Link
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-all duration-300"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link href="/books">
                            or
                            <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1 transition duration-200"
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
