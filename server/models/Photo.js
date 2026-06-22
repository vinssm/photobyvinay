const { Schema, model } = require("mongoose");

const photoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    userLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "PhotoComment",
      },
    ],
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

photoSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Photo = model("Photo", photoSchema);

module.exports = Photo;
