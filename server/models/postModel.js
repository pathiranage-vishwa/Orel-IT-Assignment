import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    picture: String,
    savedDate: {
        type: Date,
        required: true,
    },
    savedBy: String,
    description: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    }
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
