import {v2 as cloudinary} from 'cloudinary'
import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_URL } from '../settings.js'
import fs from 'fs'

const uploadOnCloudinary=async (filePath) => {
cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
})

try {
    const uploadResult = await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath)
    return uploadResult.secure_url

} catch (error) {
    fs.unlinkSync(filePath)
    console.log(error)
}
}

export default uploadOnCloudinary