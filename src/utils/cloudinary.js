import dotenv from 'dotenv'
dotenv.config()

import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";


// Configuration
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file uploaded successfully
        // console.log("file uploaded", response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as the upload operation got failed
    }
}

const uploadResult = await cloudinary.uploader
    .upload(
        "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
        {
            public_id: "shoes",
        }
    )
    .catch((error) => {
        console.log(error);
    });


export {uploadOnCloudinary}

// console.log(uploadResult);
