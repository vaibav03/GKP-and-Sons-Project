"use client";

import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { X, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { Pencil } from "lucide-react"; // Importing the edit icon
import {
    Product,
    getCategories,
    getSubCategories,
    writebyCat,
    getImageSlider,
    deleteImageSlider,
    deleteProduct,
    getProductId,
    addImageSlider,
    getbyCat,
    editProduct,
    getInstaFeeds,
    addInstafeeds,
    deleteInstaFeeds,
} from "../utils/queries";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { Dancing_Script, Montserrat } from "next/font/google";
import Image from "next/image";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // Adjust as needed
});

const montserrat = Montserrat({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
});

const AdminPage: React.FC = () => {
    const router = useRouter();
    const [operations, setOperations] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");
    const [imageDescription, setImageDescription] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");
    const [productId, setproductId] = useState<string[]>([]);
    const [imageSlider, setImageSlider] = useState<string[]>([]);
    const [carat, setCarat] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [delProducts, setDelProducts] = useState<Product[]>([]);
    const [delcat, setDelCat] = useState<string>("All");
    const [delsubcat, setDelSubCat] = useState<string>("All");
    const [editProductId, setEditProductId] = useState<string>('');
    const [instaUrl, setInstaUrl] = useState<string>("");
    const [instaImageUrl, setInstaImageUrl] = useState<string>("");
    const validurl = (image) => {
        try {
            const url = new URL(image);
            return true;
        } catch (e) {
            return false;
        }
    };

    async function edit() {
        try {
            const updatedProduct: Product = {
                name: imageName,
                category: selectedCategory,
                subcategory: selectedSubcategory,
                description: imageDescription,
                imageUrl: imageURL,
                isImageSlider: false,
                productId: editProductId,
                weight: weight,
                size: size,
                carat: carat,
            }
            await editProduct(editProductId, updatedProduct)
        } catch (e) {
            toast.error("Error in deleting product")
        }
    }
    useEffect(() => {
        const auth = secureLocalStorage.getItem("auth");
        if (!auth) router.push("/login");
    }, [router]);

    useEffect(() => {
        if (operations === "addProduct") {
            getCategories().then((data) => setCategories(data));
            getSubCategories().then((data) => setSubcategories(data));
            setEditProductId("")
            setCarat("");
            setSize("");
            setWeight("");
            setImageName("");
            setImageDescription("");
            setImageURL("");
            setSelectedCategory("");
            setSelectedSubcategory("");
        }
        if (operations === "deleteProduct") {
            getCategories().then((data) => {
                setCategories(data);
            });
            getSubCategories().then((data) => [setSubcategories(data)]);
            getbyCat().then((data) => {
                setDelProducts(data);
            });
            getProductId().then((data) => {
                console.log(data);
                setproductId(data as string[]);
            });
        }
        if (operations === "imageSlider") {
            getImageSlider().then((data) => {
                setImageSlider(data as string[]);
            });
            setEditProductId("")
            setCarat("");
            setSize("");
            setWeight("");
            setImageName("");
            setImageDescription("");
            setImageURL("");
            setSelectedCategory("");
            setSelectedSubcategory("");
        }
        if (operations === "instafeeds") {
            getInstaFeeds().then((data: string[]) => {
                console.log(data);
                setImageSlider(data);
            });
        }
    }, [operations]);

    const [filteredDelProducts, setFilteredDelProducts] = useState<Product[]>(
        [],
    );

    useEffect(() => {
        const filtered = delProducts.filter((data) => {
            return (
                (delcat === "All" || data.category === delcat) &&
                (delsubcat === "All" || data.subcategory === delsubcat)
            );
        });
        setFilteredDelProducts(filtered);
    }, [delcat, delsubcat, delProducts]);


    async function deleteimage(image: string) {
        try {
            if (imageSlider.length == 2)
                return toast.error("Cannot delete lesser than 2 images");
            await deleteImageSlider(image);
            console.log("deleteImageSlider called successfully");

            setImageSlider((prev) => prev.filter((item) => item !== image));
            toast.success("Success in deleting image slider");
        } catch (e: any) {
            console.error("Error in deleteimage:", e);
            toast.error("Error in deleting image slider: " + e.message);
        }
    }

    async function addImage(image: string) {
        try {
            if (image === "") return toast.error("Add image URL");
            if (!validurl(image)) return toast.error("Enter valid URL");

            await addImageSlider(image);
            toast.success("Success in adding image slider");
            setImageSlider([...imageSlider, image]);
            setImageURL("");
        } catch (e: any) {
            toast.error("Error in adding image slider", e);
        }
    }

    return (
        secureLocalStorage.getItem("auth") === "true" && (
            <>
                <div className="bg-[#fee9b1] text-white py-8 px-4 shadow-md w-[20%] h-screen fixed flex flex-col justify-between items-center">
                    <div className="w-full">
                        <p
                            className={`text-xl text-[#5A3E2B] ${montserrat.className}`}
                        >
                            Admin Page
                        </p>
                        <p
                            className={`text-4xl text-[#B8860B] ${dancingScript.className} mt-2 mb-20`}
                        >
                            {"GKP & Son's Jewellers"}
                        </p>

                        <div className="flex flex-col space-y-4 items-center">
                            <button
                                className="px-4 py-2 bg-[#2C3E50] text-[#FFFFFF] rounded shadow w-full"
                                onClick={() => setOperations("addProduct")}
                            >
                                Add Products
                            </button>
                            <button
                                className="px-4 py-2 bg-[#2C3E50] text-[#FFFFFF] rounded shadow w-full"
                                onClick={() => setOperations("imageSlider")}
                            >
                                Add ImageSlider
                            </button>
                            <button
                                className="px-4 py-2 bg-[#2C3E50] text-[#FFFFFF] rounded shadow w-full"
                                onClick={() => setOperations("deleteProduct")}
                            >
                                Manage Products
                            </button>
                            <button
                                className="px-4 py-2 bg-[#2C3E50] text-[#FFFFFF] rounded shadow w-full"
                                onClick={() => setOperations("instafeeds")}
                            >
                                Instagram Feeds
                            </button>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        className="px-4 py-2 bg-[#8B0000] text-white rounded-full shadow w-full mb-10"
                        onClick={() => {
                            secureLocalStorage.removeItem("auth");
                            router.push("/");
                        }}
                    >
                        Logout
                    </button>
                </div>

                {(operations === "addProduct" && (
                    <div className="ml-52 flex flex-col space-y-5 items-center justify-center">
                        <div className="mt-5"></div>
                        <Autocomplete
                            style={{ width: "50%" }}
                            options={categories}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Type or select Categories"
                                    variant="outlined"
                                />
                            )}
                            onInputChange={(_, value) => {
                                setSelectedCategory(value);
                                console.log("Input Changed:", value);
                            }}
                            value={selectedCategory}
                        />
                        <Autocomplete
                            style={{ width: "50%" }}
                            options={subcategories}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Type or select Subcategories"
                                    variant="outlined"
                                />
                            )}
                            value={selectedSubcategory}
                            onInputChange={(_, value) => {
                                // Triggered when the user types in the input
                                setSelectedSubcategory(value); // Update the selected category with typed input
                                console.log("Subcat Input Changed:", value);
                            }}
                        />
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            className="w-[50%]"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                        />
                        <TextField
                            label="Product Description"
                            variant="outlined"
                            className="w-[50%]"
                            value={imageDescription}
                            onChange={(e) =>
                                setImageDescription(e.target.value)
                            }
                        />
                        <TextField
                            label="Product Image URL"
                            variant="outlined"
                            className="w-[50%]"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                        <TextField
                            label="Enter Product Size"
                            variant="outlined"
                            className="w-[50%]"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                        <TextField
                            label="Enter Weight of Product"
                            variant="outlined"
                            className="w-[50%]"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <TextField
                            label="Enter Carat of Product"
                            variant="outlined"
                            className="w-[50%]"
                            value={carat}
                            onChange={(e) => setCarat(e.target.value)}
                        />
                        <button
                            className="flex items-center gap-2 justify-center bg-[#eba52d] hover:bg-[#c58820] text-[#432d0d] hover:text-[#ffe7c2] py-2 px-4 rounded w-1/2"
                            onClick={async () => {
                                if (
                                    selectedCategory === "" ||
                                    selectedSubcategory === "" ||
                                    imageName === "" ||
                                    imageDescription === "" ||
                                    imageURL === "" ||
                                    carat === "" ||
                                    size === "" ||
                                    weight === ""
                                ) {
                                    toast.error("Please fill all the fields");
                                    return;
                                }
                                if (!validurl(imageURL))
                                    return toast.error("Enter Valid URL");

                                await writebyCat({
                                    category: selectedCategory,
                                    subcategory: selectedSubcategory,
                                    name: imageName,
                                    description: imageDescription,
                                    imageUrl: imageURL,
                                    carat: carat,
                                    size: size,
                                    weight: weight,
                                });
                                toast.success("Product added successfully");
                                setCarat("");
                                setSize("");
                                setWeight("");
                                setImageName("");
                                setImageDescription("");
                                setImageURL("");
                                setSelectedCategory("");
                                setSelectedSubcategory("");
                            }}
                        >
                            <Plus size={18} /> Add Product
                        </button>
                    </div>
                )) ||
                    (operations === "imageSlider" && (
                        <div className="ml-52 justify-center items-center flex flex-col space-y-4">
                            <div className="flex flex-col items-center justify-center space-y-4 mt-10">
                                <TextField
                                    label="Image URL"
                                    variant="outlined"
                                    value={imageURL}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setImageURL(e.target.value)}
                                    style={{ width: "50%" }}
                                />
                                <button
                                    className="flex justify-center items-center gap-2 bg-[#eba52d] hover:bg-[#c58820] text-[#432d0d] hover:text-[#ffe7c2] px-4 py-2 rounded-md w-1/2"
                                    onClick={() => {
                                        addImage(imageURL);
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Image
                                </button>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {imageSlider?.map((item) => (
                                        <div
                                            key={item}
                                            className="relative"
                                            style={{ width: "50%" }}
                                        >
                                            <button
                                                className="absolute top-2 right-2 bg-gray-500 text-white p-1 rounded-full"
                                                onClick={() =>
                                                    deleteimage(item)
                                                }
                                            >
                                                <X size={20} />
                                            </button>
                                            <Image
                                                src={item}
                                                alt={item}
                                                width={500}
                                                height={300}
                                                className="w-full h-auto object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )) ||
                    (operations === "deleteProduct" &&
                        categories &&
                        subcategories && (
                            <>
                                <div className="ml-52 flex flex-col md:flex-row justify-center items-center gap-6  p-4 ">
                                    <div className="flex flex-col ">
                                        <label className="text-gray-700 font-semibold">
                                            Categories
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setDelCat(e.target.value)
                                            }
                                            className="mt-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        >
                                            <option>All</option>
                                            {categories.map((item, index) => (
                                                <option key={index}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col items-start">
                                        <label className="text-gray-700 font-semibold">
                                            Subcategories
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setDelSubCat(e.target.value)
                                            }
                                            className="mt-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        >
                                            <option>All</option>
                                            {subcategories.map(
                                                (item, index) => (
                                                    <option key={index}>
                                                        {item}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="ml-52 flex flex-col items-center justify-center space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ml-10">
                                        {filteredDelProducts?.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="relative bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center"
                                                >
                                                    <button
                                                        className="absolute top-3 right-3 bg-gray-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
                                                        onClick={async () => {
                                                            try {
                                                                await deleteProduct(
                                                                    item.productId as string,
                                                                );
                                                                setFilteredDelProducts(
                                                                    filteredDelProducts.filter(
                                                                        (
                                                                            prod,
                                                                        ) => {
                                                                            return (
                                                                                prod.productId !==
                                                                                item.productId
                                                                            );
                                                                        },
                                                                    ),
                                                                );
                                                                toast.success(
                                                                    "Success in deleting product",
                                                                );
                                                            } catch (e: any) {
                                                                toast.error(
                                                                    "Error in deleting product: " +
                                                                    e.message,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                    <button className="absolute top-1 right-3 mt-14 bg-gold text-orange-100 p-2 rounded-full shadow-md hover:scale-100" onClick={() => {
                                                        setOperations('editProduct')
                                                        setCarat(item.carat ? item.carat : '');
                                                        setSize(item.size ? item.size : '');
                                                        setWeight(item.weight ? item.weight : '');
                                                        setImageName(item.name);
                                                        setImageDescription(item.description);
                                                        setImageURL(item.imageUrl);
                                                        setSelectedCategory(item.category);
                                                        setSelectedSubcategory(item.subcategory)
                                                        setEditProductId(item.productId ? item.productId : '')
                                                    }}>
                                                        <Pencil size={20} />
                                                    </button>
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt="Product"
                                                        width={500}
                                                        height={300}
                                                        className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                    />

                                                    <p className="mt-3 text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-md shadow">
                                                        Product ID:{" "}
                                                        <span className="font-semibold text-gray-800">
                                                            {item.productId}
                                                        </span>
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </>
                        )) || (operations === "editProduct" && (
                            <div className="ml-52 flex flex-col space-y-5 items-center justify-center">
                                <div className="mt-5"></div>
                                <Autocomplete
                                    style={{ width: "50%" }}
                                    options={categories}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type or select Categories"
                                            variant="outlined"
                                        />
                                    )}
                                    onInputChange={(_, value) => {
                                        setSelectedCategory(value);
                                        console.log("Input Changed:", value);
                                    }}
                                    value={selectedCategory}
                                />
                                <Autocomplete
                                    style={{ width: "50%" }}
                                    options={subcategories}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type or select Subcategories"
                                            variant="outlined"
                                        />
                                    )}
                                    value={selectedSubcategory}
                                    onInputChange={(_, value) => {
                                        setSelectedSubcategory(value);
                                        console.log("Subcat Input Changed:", value);
                                    }}
                                />
                                <TextField
                                    label="Product Name"
                                    variant="outlined"
                                    className="w-[50%]"
                                    value={imageName}
                                    onChange={(e) => setImageName(e.target.value)}
                                />
                                <TextField
                                    label="Product Description"
                                    variant="outlined"
                                    className="w-[50%]"
                                    value={imageDescription}
                                    onChange={(e) =>
                                        setImageDescription(e.target.value)
                                    }
                                />
                                <TextField
                                    label="Product Image URL"
                                    variant="outlined"
                                    className="w-[50%]"
                                    value={imageURL}
                                    onChange={(e) => setImageURL(e.target.value)}
                                />
                                <TextField
                                    label="Enter Product Size"
                                    variant="outlined"
                                    className="w-[50%]"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                />
                                <TextField
                                    label="Enter Weight of Product"
                                    variant="outlined"
                                    className="w-[50%]"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                                <TextField
                                    label="Enter Carat of Product"
                                    variant="outlined"
                                    className="w-[50%]"
                                    value={carat}
                                    onChange={(e) => setCarat(e.target.value)}
                                />
                                <button
                                    className="flex items-center gap-2 justify-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-1/2"
                                    onClick={async () => {
                                        if (
                                            selectedCategory === "" ||
                                            selectedSubcategory === "" ||
                                            imageName === "" ||
                                            imageDescription === "" ||
                                            imageURL === "" ||
                                            carat === "" ||
                                            size === "" ||
                                            weight === ""
                                        ) {
                                            toast.error("Please fill all the fields");
                                            return;
                                        }
                                        if (!validurl(imageURL))
                                            return toast.error("Enter Valid URL");

                                        await edit();
                                        toast.success("Product edited successfully");
                                    }}
                                >
                                    Edit Product
                                </button>
                            </div>
                        )
                    ) || ((operations === "instafeeds") && (
                        <div className="ml-52 justify-center items-center flex flex-col space-y-4">
                            <div className="flex flex-col items-center justify-center space-y-4 mt-10">
                                <TextField
                                    label={<span className="font-bold">Image URL from Imgur</span>}
                                    variant="outlined"
                                    value={instaImageUrl}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setInstaImageUrl(e.target.value)}
                                    style={{ width: "50%" }}
                                />
                                <TextField
                                    label={<span className="font-bold">Instagram Link</span>}
                                    variant="outlined"
                                    value={instaUrl}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => setInstaUrl(e.target.value)}
                                    style={{ width: "50%" }}
                                />

                                <button
                                    className="flex justify-center items-center gap-2 bg-[#eba52d] hover:bg-[#c58820] text-[#432d0d] hover:text-[#ffe7c2] px-4 py-2 rounded-md w-1/2"
                                    onClick={async () => {
                                        try {
                                            if (imageSlider.length === 3) {
                                                toast.error("Can't add more than three insta feeds")
                                                return;
                                            }
                                            await addInstafeeds(instaImageUrl, instaUrl);
                                            setImageSlider((prev) => [...prev, instaImageUrl])
                                            toast.success("Succesfully added Insta Feed")
                                            setInstaImageUrl('')
                                            setInstaUrl("")
                                        } catch (e) {
                                            toast.error("Error in adding InstaFeed")
                                        }
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Image
                                </button>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {imageSlider?.map((item) => (
                                        <div
                                            key={item}
                                            className="relative"
                                            style={{ width: "50%" }}
                                        >
                                            <button
                                                className="absolute top-2 right-2 bg-gray-500 text-white p-1 rounded-full"
                                                onClick={async () => {
                                                    if (imageSlider.length === 1) {
                                                        toast.error("Can't have less than 1 insta feed")
                                                        return;
                                                    }
                                                    await deleteInstaFeeds(item);
                                                    setImageSlider((prev) => prev.filter((img) => img !== item));
                                                }}
                                            >
                                                <X size={20} />
                                            </button>
                                            <Image
                                                src={item}
                                                alt={item}
                                                width={500}
                                                height={300}
                                                className="w-full h-auto object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )

                    )}
            </>
        )
    );
};

export default AdminPage;
