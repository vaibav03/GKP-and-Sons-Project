import Image from "next/image";
import InstaCard from "./instagramPostsCard";
import { Montserrat, Cardo } from "next/font/google";

const montserrat = Montserrat({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
});

const cardo = Cardo({
    weight: "400",
    subsets: ["latin"],
});

export default function Footer() {
    const Items = [
        { src: "/Collections/pendants.png", title: "PENDANTS" },
        { src: "/Collections/chains.png", title: "CHAINS" },
        { src: "/Collections/bangles.png", title: "BANGLES" },
        { src: "/Collections/Bracelets.png", title: "BRACELETS" },
    ];

    return (
        <div className="md:flex gap-5 pt-10 pb-10 pl-5 md:pl-14 md:pr-14 bg-[#170722] text-gray-300 justify-evenly">
            <div className="flex-1">
                <p
                    className={`underline decoration-gold decoration-4 underline-offset-8 text-xl font-medium mb-5 text-white ${montserrat.className}`}
                >
                    Contact Information
                </p>
                <div className={`text-lg font-medium ${cardo.className}`}>
                    <div className={`pl-4 border-l-4 mb-2`}>
                        <p className={`text-gold`}>Call Us</p>
                        <p>0422 239 6449</p>
                    </div>
                    <div className={`pl-4 border-l-4 mb-2`}>
                        <p className={`text-gold`}>Email Us</p>
                        <p>gkpjewellers24@gmail.com</p>
                    </div>
                    <div className={`pl-4 border-l-4 mb-2`}>
                        <p className={`text-gold`}>Follow Us</p>
                        <div className="flex gap-4 mt-1">
                            <Image
                                src="SocialMediaIcons/Facebook.svg"
                                alt="Facebook"
                                width="12"
                                height="12"
                            />
                            <Image
                                src="SocialMediaIcons/Instagram.svg"
                                alt="Instagram"
                                width="25"
                                height="25"
                            />
                            <Image
                                src="SocialMediaIcons/Whatsapp.svg"
                                alt="Whatsapp"
                                width="25"
                                height="25"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 w-[70%] md:w-[100%] mt-10 md:mt-0">
                <p
                    className={`underline decoration-gold decoration-4 underline-offset-8 text-xl font-medium mb-5 text-white ${montserrat.className}`}
                >
                    Locate Us
                </p>
                <p className={`text-lg font-medium ${cardo.className}`}>
                    Swarna Mahal Complex, 441/2, Big Bazaar St, Prakasam, Town
                    Hall, Coimbatore, Tamil Nadu 641001
                </p>
            </div>
            <div className="flex-1 mt-10 md:mt-0 md:ml-10">
                <p
                    className={`underline decoration-gold decoration-4 underline-offset-8 text-xl font-medium mb-5 text-white ${montserrat.className}`}
                >
                    Useful Links
                </p>
                <p className={`text-lg font-medium mb-2 ${cardo.className}`}>
                    About Us
                </p>
                <p className={`text-lg font-medium mb-2 ${cardo.className}`}>
                    Why Choose Us
                </p>
                <p className={`text-lg font-medium mb-2 ${cardo.className}`}>
                    Products
                </p>
                <p className={`text-lg font-medium mb-2 ${cardo.className}`}>
                    Collections
                </p>
                <p className={`text-lg font-medium ${cardo.className}`}>FAQs</p>
            </div>
            <div className="flex-1 mt-10 md:mt-0">
                <p
                    className={`underline decoration-gold decoration-4 underline-offset-8 text-xl font-medium mb-5 text-white ${montserrat.className}`}
                >
                    Instagram Feeds
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                    {Items.map((item, index) => (
                        <InstaCard
                            key={index}
                            src={item.src}
                            title={item.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
