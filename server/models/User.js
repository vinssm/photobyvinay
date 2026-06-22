const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

// import schema from Comment.js
const commentSchema = require("./Comment");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedComments to be an array of data that adheres to the commentSchema
    savedComments: [commentSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// hash user password
userSchema.pre("save", async function () {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `commentCount` with the number of saved comments we have
userSchema.virtual("commentCount").get(function () {
  return this.savedComments.length;
});

const User = model("User", userSchema);

module.exports = User;
