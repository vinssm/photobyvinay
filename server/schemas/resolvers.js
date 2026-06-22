const { GraphQLError } = require("graphql");
const { User, Photo, PhotoComment } = require("../models");
const { signToken } = require("../utils/auth");

const authenticationError = (message) =>
  new GraphQLError(message, {
    extensions: { code: "UNAUTHENTICATED" },
  });

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password",
        );

        return userData;
      }

      throw authenticationError("Not logged in");
    },
    photos: async () => {
      try {
        const photos = await Photo.find()
          .populate("comments")
          .sort({ createdAt: -1 });
        return photos;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch photos");
      }
    },
    photo: async (parent, { id }) => {
      try {
        const photo = await Photo.findById(id).populate("comments");
        return photo;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch photo");
      }
    },
    myPhotoComments: async (parent, args, context) => {
      if (!context.user) throw authenticationError("Not logged in");
      try {
        return await PhotoComment.find({ authorId: context.user._id }).sort({
          createdAt: -1,
        });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch comments");
      }
    },
  },

  PhotoComment: {
    photo: async (parent) => {
      try {
        return await Photo.findById(parent.photoId);
      } catch (err) {
        return null;
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        if (error.code === 11000) {
          throw new GraphQLError(
            "That username or email is already registered.",
            { extensions: { code: "BAD_USER_INPUT" } },
          );
        }

        throw error;
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw authenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw authenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveComment: async (parent, { commentData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedComments: commentData } },
          { new: true },
        );

        return updatedUser;
      }

      throw authenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedComments: { commentId } } },
          { new: true },
        );

        return updatedUser;
      }

      throw authenticationError("You need to be logged in!");
    },
    addPhoto: async (parent, { title, imageUrl, description }, context) => {
      if (!context.user) {
        throw authenticationError("You need to be logged in!");
      }

      try {
        const photo = await Photo.create({
          title,
          imageUrl,
          description,
        });

        return photo;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to add photo");
      }
    },
    toggleLike: async (parent, { photoId }, context) => {
      if (!context.user) {
        throw authenticationError("You need to be logged in!");
      }

      try {
        const photo = await Photo.findById(photoId);

        if (!photo) {
          throw new Error("Photo not found");
        }

        const userId = context.user._id.toString();
        const userLikedIndex = photo.userLikes.findIndex(
          (id) => id.toString() === userId,
        );

        if (userLikedIndex > -1) {
          photo.userLikes.splice(userLikedIndex, 1);
          photo.likeCount -= 1;
        } else {
          photo.userLikes.push(context.user._id);
          photo.likeCount += 1;
        }

        await photo.save();
        return photo.populate("comments");
      } catch (err) {
        console.error(err);
        throw new Error("Failed to toggle like");
      }
    },
    addPhotoComment: async (parent, { photoId, text }, context) => {
      if (!context.user) {
        throw authenticationError("You need to be logged in!");
      }

      try {
        const user = await User.findById(context.user._id);
        const photo = await Photo.findById(photoId);

        if (!photo) {
          throw new Error("Photo not found");
        }

        const comment = await PhotoComment.create({
          photoId,
          author: user.username,
          authorId: context.user._id,
          text,
        });

        photo.comments.push(comment._id);
        await photo.save();

        return comment;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to add comment");
      }
    },
    deletePhotoComment: async (parent, { photoCommentId }, context) => {
      if (!context.user) {
        throw authenticationError("You need to be logged in!");
      }

      try {
        const comment = await PhotoComment.findById(photoCommentId);

        if (!comment) {
          throw new Error("Comment not found");
        }

        if (comment.authorId.toString() !== context.user._id.toString()) {
          throw authenticationError(
            "You can only delete your own comments!",
          );
        }

        const photo = await Photo.findByIdAndUpdate(
          comment.photoId,
          { $pull: { comments: photoCommentId } },
          { new: true },
        ).populate("comments");

        await PhotoComment.findByIdAndDelete(photoCommentId);

        return photo;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to delete comment");
      }
    },
  },
};

module.exports = resolvers;

