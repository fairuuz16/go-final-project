import React from 'react';

const Footer: React.FC<any> = () => {
    return (
        <footer className="bg-gray-900 text-white py-2 px-4">
            {/* Top Section */}
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="w-full">
                    <p className="mt-2 text-center text-gray-300 text-m">
                        ©2024 Book Store. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
