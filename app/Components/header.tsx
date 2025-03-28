import React, { useState } from "react";
import Image from "next/image";
import { Dancing_Script, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // Adjust as needed
});

const montserrat = Montserrat({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
});

export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative pt-[60px] md:pt-[60px] lg:[80px]">
            <header className="fixed top-0 left-0 flex items-center justify-between p-6 bg-[#170722] w-full z-50 ">
                {/* Mobile Menu Icon */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden focus:outline-none"
                >
                    <Image
                        src="/Others/MenuIcon.svg"
                        alt="MenuIcon"
                        width={25}
                        height={25}
                    />
                </button>

                {/* Logo Centered in Mobile/Tablet */}
                <div className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
                    <Link href="/">
                        <Image
                            src="/GKP_Logo.png"
                            alt="Logo"
                            width={170}
                            height={150}
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav
                    className={`hidden lg:flex gap-8 ml-20 ${montserrat.className} justify-center`}
                >
                    {[
                        { name: "Home", path: "/#Home" },
                        { name: "About Us", path: "/aboutus" },
                        { name: "Collections", path: "/gallery" },
                        { name: "Contact Us", path: "/#Contact Us" },
                    ].map((item, index) => (
                        <a
                            href={item.path}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                router.push(item.path);
                            }}
                            key={index}
                            className="text-base tracking-wide text-white hover:text-gold"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
                {/* Call Us Section */}
                <div className="hidden lg:flex items-center justify-center space-x-3">
                    <p
                        className={`text-gold text-xl ${dancingScript.className}`}
                    >
                        Call Us
                    </p>
                    <p className={`text-white ${montserrat.className}`}>
                        +91 98428 31542
                    </p>
                </div>
            </header>

            {/* Mobile Side Navbar */}
            <div
                className={`md:hidden fixed top-0 left-0 h-full bg-[#fff0c7] text-white z-50 transform ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 w-[70%]`}
            >
                <div className=" p-4 md:flex items-center justify-between border-black mb-5">
                    <h2
                        className={`text-xl text-[#5A3E2B] ${montserrat.className}`}
                    >
                        Welcome to
                    </h2>
                    <p
                        className={`text-4xl text-[#B8860B] ${dancingScript.className} mt-2`}
                    >
                        GKP & Sons Jewellers
                    </p>
                </div>
                <nav className="flex flex-col gap-1">
                    {[
                        { name: "Home", path: "/#Home" },
                        { name: "About Us", path: "/aboutus" },
                        { name: "Collections", path: "/gallery" },
                        { name: "Contact Us", path: "/#Contact Us" },
                    ].map((item, index) => (
                        <a
                            href={item.path}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                router.push(item.path);
                            }}
                            key={index}
                            className={`p-4 text-base text-black tracking-wide border-b border-b-gold pb-2 ${montserrat.className}`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Overlay when menu is open */}
            {isMenuOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                ></div>
            )}
        </div>
    );
}
