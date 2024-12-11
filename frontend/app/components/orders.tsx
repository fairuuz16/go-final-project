"use client";

import { useGetUserOrdersQuery } from "@/app/store/reducers/orders/ordersApi";
import { Order } from "../types/order.type";

const Orders = () => {
    const { data: orders = [] as Order[], isLoading, isError } = useGetUserOrdersQuery();

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (isError) return <div className="text-center text-red-500">Error getting orders data</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Your Orders</h2>
            {
                orders.length === 0 ? (
                    <div className="text-center text-gray-500">No orders found!</div>
                ) : (
                    <div>
                        {orders.map((order, index) => (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <p className="p-2 bg-blue-500 text-white rounded-full mb-3 w-16 text-center">{`#${index + 1}`}</p>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Order ID: {order.id}</h3>
                                <p className="text-gray-600 mb-1"><strong>Name:</strong> {order.name}</p>
                                <p className="text-gray-600 mb-1"><strong>Email:</strong> {order.email}</p>
                                <p className="text-gray-600 mb-1"><strong>Phone:</strong> {order.phone}</p>
                                <p className="text-gray-600 mb-3"><strong>Total Price:</strong> ${order.total_price}</p>
                                
                                <div className="border-t border-gray-300 mt-4 pt-4">
                                    <h4 className="font-semibold text-gray-800">Address:</h4>
                                    <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                </div>

                                <div className="border-t border-gray-300 mt-4 pt-4">
                                    <h4 className="font-semibold text-gray-800">Books:</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        {order.books.map((book) => (
                                            <li key={book.id} className="text-gray-700">{book.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Orders;
