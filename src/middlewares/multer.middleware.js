import multer from "multer";

const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer() method 
    destination: function (req, file, cb) {
      cb(null, "./public/temp") // this is the path where your files will be saved. Notice the path is relative to the root directory of the project 
    },
    filename: function (req, file, cb) { // this function will be called for each file uploaded. 
      
      cb(null, file.originalname) // notice we are calling the callback function with the original name of the file 
    }
  })
  
export const upload = multer({ // notice you are calling the multer() method here, not multer.diskStorage() method, because multer() method returns a middleware function.
    storage, 
})