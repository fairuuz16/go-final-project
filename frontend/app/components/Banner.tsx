"use client";

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import TopSellers from "@/app/components/TopSellers";  // Import the TopSellers component

const Banner = () => {
    // Animation variants for the image (coming from the right)
    const imageVariants = {
        hidden: {x: '100%', opacity: 0},
        visible: {x: 0, opacity: 1, transition: {duration: 1}},
    };

    // Animation variants for the text (coming from the left)
    const textVariants = {
        hidden: {x: '-100%', opacity: 0},
        visible: {x: 0, opacity: 1, transition: {duration: 1}},
    };

    return (
        <>
            {/* Banner Section (Full screen height) */}
            <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12 min-h-screen">
                {/* Animated Image div */}
                <motion.div
                    className="md:w-1/2 w-full flex items-center md:justify-end"
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                >
                    <Image src="/assets/banner.png" alt="banner" width={1000} height={800} />
                </motion.div>

                {/* Animated Text div */}
                <motion.div
                    className="md:w-1/2 w-full text-center md:text-left"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    <h1 className="text-4xl font-semibold mb-4">Welcome to Book Store</h1>
                    <p className="text-lg text-gray-600">
                        It's time to update your reading list with some of the latest and greatest releases
                        in the literary world. The best part? You can get them all right here at Book Store.
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default Banner;
