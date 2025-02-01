"use client";

import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import Rights from "../components/rights";
import { Montserrat, Cardo } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { getProduct } from "../utils/queries";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
});

const cardo = Cardo({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function ProductsDescription() {
    const searchParams = useSearchParams();
    const encodedId = searchParams.get("productId");
    const productId = encodedId ? decodeURIComponent(encodedId) : "";
    const [product, setProduct] = useState<{ productId: string; name: string; description: string, imageUrl: string }>();
    useEffect(() => {
        getProduct(productId).then((res: any) => {
            setProduct(res);
        });
    }, [])
    return (
        <div className="bg-[#FFFCF8]">
            <Header />
            <div className="bg-black w-full h-52 flex items-center justify-center relative">
                {/* Glowing Background */}
                <div className="absolute flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-100 to-transparent blur-2xl mt-8 ml-4"></div>
                </div>
                {/* Content */}
                <div className="flex flex-col items-center z-10">
                    <h1
                        className={`text-white text-center font-normal font-serif text-2xl md:text-4xl ${montserrat.className}`}
                    >
                        CASTING GOLD RINGS
                    </h1>
                    <div className="h-1 w-16 bg-gold mt-3"></div>
                </div>
            </div>
            <div className="flex justify-center -mt-1">
                <Image
                    src="/Polygon.svg"
                    alt="Triangle"
                    width="100"
                    height="100"
                />
            </div>
            <div className="md:flex p-4 justify-center items-center mt-5">
                <div className="flex justify-center items-center">
                    <Image
                        src="/CastingRings/CastingRing1.png"
                        alt="CastingRing1"
                        className="object-cover w-[450px] md:w-[400px] h-[280px]"
                        width="250"
                        height="100"
                    />
                </div>
                <div className="md:w-[30%] justify-center md:ml-10 mt-5 md:mt-0">
                    <h1
                        className={`text-3xl md:text-4xl text-center text-black font-medium ${montserrat.className}`}
                    >
                        {product?.name}
                    </h1>
                    <p
                        className={`mt-5 text-center md:text-none text-base text-gray-600 ${cardo.className}`}
                    >
                        {product?.description}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="border-2 border-gray-500 rounded-2xl mt-5 mb-5 p-4 md:p-8 inline-block justify-center">
                    <p
                        className={`text-black text-lg md:text-2xl ${montserrat.className}`}
                    >
                        Product Details
                    </p>
                    <div className="flex mt-6 md:mt-8 gap-14 md:gap-80">
                        <div>
                            <p
                                className={`text-black font-semibold text-base md:text-lg ${cardo.className}`}
                            >
                                22grms
                            </p>
                            <p
                                className={`text-gray-600 text-sm md:text-lg ${montserrat.className}`}
                            >
                                Weight
                            </p>
                        </div>
                        <div>
                            <p
                                className={`text-black font-semibold text-base md:text-lg ${cardo.className}`}
                            >
                                32
                            </p>
                            <p
                                className={`text-gray-600 text-sm md:text-lg ${montserrat.className}`}
                            >
                                Size
                            </p>
                        </div>
                        <div>
                            <p
                                className={`text-black font-semibold text-base md:text-lg ${cardo.className}`}
                            >
                                24 Karat
                            </p>
                            <p
                                className={`text-gray-600 text-sm md:text-lg ${montserrat.className}`}
                            >
                                Carat
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Rights />
        </div>
    );
}
