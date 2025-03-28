"use client";

import { Cardo } from "next/font/google";

const cardo = Cardo({
    weight: "400",
    subsets: ["latin"],
});

export default function Rights() {
    return (
        <div
            className={`md:flex text-sm text-center md:justify-evenly text-gray-500 bg-black pt-8 pb-8 pl-14 pr-14 ${cardo.className}`}
        >
            <p>© 2025 GKP & Sons Jewellers | All Rights Reserved.</p>
            <p>
                <a href="/privacy" className="cursor-pointer hover:underline">
                    Privacy Policy
                </a>{" "}
                |
                <a
                    href="/terms"
                    className="cursor-pointer hover:underline ml-1"
                >
                    Terms and Conditions
                </a>
            </p>
        </div>
    );
}
