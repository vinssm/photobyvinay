const { Schema, model } = require("mongoose");

const photoCommentSchema = new Schema(
  {
    photoId: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

const PhotoComment = model("PhotoComment", photoCommentSchema);

module.exports = PhotoComment;
