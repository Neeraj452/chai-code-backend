import mongoose, {Schema} from "mongoose"; // This imports the mongoose library and the Schema object from mongoose. The Schema object is used to define the structure of the documents that will be stored in the videos collection. The mongoose library is used to create the Video model, which is used to perform CRUD operations on the videos collection, and to create the documents that will be stored in the videos collection.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // This is a plugin for mongoose that adds a paginate() method to the aggregate object. This method is used to paginate the results of an aggregate query, which is a query that returns an array of documents created by grouping together documents from multiple collections, or multiple documents from a single collection, or both, using the aggregate pipeline.

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate) // This adds the paginate() method to the aggregate object, which is used to paginate the results of an aggregate query, which is a query that returns an array of documents created by grouping together documents from multiple collections, or multiple documents from a single collection, or both, using the aggregate pipeline.

export const Video = mongoose.model("Video", videoSchema)