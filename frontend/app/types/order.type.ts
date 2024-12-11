export type Address = {
    city: string;
    state: string;
    country: string;
    zipcode: string;
};

export type Book = {
    id: number;
    title: string;
};

export type Order = {
    id: number;
    name: string; 
    email: string; 
    phone: string;
    total_price: number; 
    address: Address; 
    books: Book[];
};