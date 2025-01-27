"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    TextField,
    Checkbox,
    Autocomplete
} from "@mui/material";
import { toast } from "react-hot-toast";
import {
    getCategories,
    getSubCategories,
    writebyCat,
    addImageSlider,
    deleteImageSlider,
    deleteProduct
} from "../utils/queries";

const AdminPage: React.FC = () => {
    const [operations, setOperations] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");
    const [imageDescription, setImageDescription] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");
    const [isImageSlider, setisImageSlider] = useState<boolean>(false);
    const [productId1, setProductId1] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (operations === 'addProduct') {
            getCategories().then((data) => setCategories(data));
            getSubCategories().then((data) => setSubcategories(data));
        }
    }, [operations]);

    return (
        <>
            <div className="flex flex-row items-center justify-center space-x-5">
                <button className="bg-blue-500 text-white rounded p-2 m-2" onClick={() => setOperations('addProduct')}>Add Product</button>
                <button className="bg-blue-500 text-white rounded p-2 m-2" onClick={() => setOperations('addImageSlider')}>Add in ImageSlider</button>
                <button className="bg-blue-500 text-white rounded p-2" onClick={() => { setOperations('deleteImageSlider') }}>Delete from ImageSlider</button>
                <button className="bg-blue-500 text-white rounded p-2" onClick={() => setOperations('deleteProduct')}>Delete Product</button>
            </div>
            {
                (operations === 'addProduct') && (
                    <div className="flex flex-row items-center justify-center space-x-5">
                        <Autocomplete
                            style={{ width: '215px' }}
                            options={categories}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Type or select Categories" variant="outlined" />
                            )}
                            onInputChange={(_, value) => {
                                // Triggered when the user types in the input
                                setSelectedCategory(value); // Update the selected category with typed input
                                console.log("Input Changed:", value);
                            }}
                        />
                        <Autocomplete
                            style={{ width: '215px' }}
                            options={subcategories}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Type or select Subcategories" variant="outlined" />
                            )}
                            onInputChange={(_, value) => {
                                // Triggered when the user types in the input
                                setSelectedSubcategory(value); // Update the selected category with typed input
                                console.log("Subcat Input Changed:", value);
                            }}                        />
                        <TextField

                            label="Product Name"
                            variant="outlined"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)} />
                        <TextField
                            label="Product Description"
                            variant="outlined"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)} />
                        <TextField
                            label="Product Image URL"
                            variant="outlined"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)} />
                        <Checkbox onChange={(e) => { setisImageSlider(e.target.checked) }} name="Set as Image Slider?" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                if (selectedCategory === "" || selectedSubcategory === "" || imageName === "" || imageDescription === "" || imageURL === "") {
                                    toast.error("Please fill all the fields");
                                    return;
                                }
                                writebyCat({
                                    category: selectedCategory,
                                    subcategory: selectedSubcategory,
                                    name: imageName,
                                    description: imageDescription,
                                    imageUrl: imageURL,
                                    isImageSlider: isImageSlider
                                });
                                setImageName("");
                                setImageDescription("");
                                setImageURL("");
                                setisImageSlider(false);
                                setSelectedCategory("");
                                setSelectedSubcategory("");
                            }}>Add Product</button>
                    </div>
                ) || ((operations === 'addImageSlider') && (
                    <div className="flex flex-col items-center justify-center">
                        <TextField
                            label=""
                            variant="outlined"
                            value={productId1}
                            onChange={(e) => setProductId1(e.target.value)} />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                if (productId1 === "")
                                    return toast.error("Please Select a Product");
                                addImageSlider(productId1);
                                setProductId1("");
                            }}>Add to Image Slider</button>
                    </div>)) || (
                    (operations === "deleteImageSlider") && (
                        <div className="flex flex-col items-center justify-center">
                            <TextField
                                label=""
                                variant="outlined"
                                value={productId1}
                                onChange={(e) => setProductId1(e.target.value)} />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    if (productId1 === "")
                                        return toast.error("Please Select a Product");
                                    deleteImageSlider(productId1);
                                    setProductId1("");
                                }}>Add to Image Slider</button>
                        </div>
                    )
                ) || (
                    (operations === 'deleteProduct') && (
                        <div className="flex flex-col items-center justify-center">
                            <TextField
                                label=""
                                variant="outlined"
                                value={productId1}
                                onChange={(e) => setProductId1(e.target.value)} />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    if (productId1 === "")
                                        return toast.error("Please Select a Product");
                                    deleteProduct(productId1);
                                    setProductId1("");
                                }}>Delete Product</button>
                        </div>
                    )
                )
            }

        </>
    )
};

export default AdminPage;
