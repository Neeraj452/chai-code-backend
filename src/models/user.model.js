import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema( // This defines the userSchema schema. The schema defines the structure of the documents that will be stored in the users collection. The schema defines the fields that will be stored in the database and the type of each field. The schema also defines the validation rules for each field. The schema is used to create the User model.
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
 //  This checks whether the "password" field of the document has been modified. If it has not been modified, the middleware exits early by calling next() without further processing.
//   This is a common optimization to avoid unnecessarily hashing the password when it hasn't changed.

  this.password = await bcrypt.hash(this.password, 10);
  next();
//   this.password = await bcrypt.hash(this.password, 10);: If the "password" field has been modified, this line hashes the password using the bcrypt library.
//  The bcrypt.hash function is an asynchronous operation, so it uses await to wait for the hashing to complete.
// next();: After hashing the password (if necessary), this calls next() to proceed with the save operation.
});

userSchema.methods.isPasswordCorrect = async function (password) { // This method is used to compare the password entered by the user with the hashed password stored in the database.
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () { // This method is used to generate the access token for the user. It uses the jwt.sign function to generate the token. The token is signed using the ACCESS_TOKEN_SECRET environment variable and expires in 15 minutes. The token contains the user's _id, email, username, and fullName. The token is returned to the caller. 
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () { // This method is used to generate the refresh token for the user. It uses the jwt.sign function to generate the token. The token is signed using the REFRESH_TOKEN_SECRET environment variable and expires in 7 days. The token contains the user's _id. The token is returned to the caller.
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema); // This creates the User model from the userSchema schema and exports it. The model is exported so that it can be used in other parts of the application. The model is used to perform CRUD operations on the users collection in the database. The model is also used to create new users and validate user input.  
