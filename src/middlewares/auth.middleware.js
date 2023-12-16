import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => { // this middleware will verify access token of user 
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") // we are checking if access token is present in cookies or in authorization header 
        
        console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // we are verifying access token using jwt.verify method 
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken") // we are finding user by id and excluding password and refresh token from response
    
        if (!user) {
            // NEXT_VIDEO: discuss about frontend
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})