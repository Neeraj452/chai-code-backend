import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router() // notice we are calling the Router() method here, not router() method, because Router() method returns a router object, whereas router() method returns a middleware function.

router.route("/register").post( 
    upload.fields([ // upload.fields() method is used to upload multiple files, in this case avatar and coverImage, you can also use upload.single() method to upload single file,
        {   
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)


//secured routes
router.route("/logout").post(verifyJWT,  logoutUser) // 


export default router