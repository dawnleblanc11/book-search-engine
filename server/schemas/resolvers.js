// import user model
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
// import sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get user name and password log in information
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user.id }).select();
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    // create a user, store email and password
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login a user, validate username and password
    login: async (parent, { email, password }) => {
      const user = awat.User.findOne({ email });
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    // save a book to a users saved books
    // remove a book
  },
};
module.exports = resolvers;

