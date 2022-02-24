const { AuthenticationError } = require("apollo-server-express");
// import user model
const { User, Book } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get user name and password log in information
    me: async (parent, args, context) => {
      // if (context.user) {
      //   const userData = await User.findOne({ _id: context.user._id })
      //     .select('-__v -password')
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select();
      //   return userData; 
      
    }
      throw new AuthenticationError('Not logged in');
    }
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
     saveBook: async (parent, { input }, context) =>{
       if (context.user) {
         const updatedUser = await User.findOneAndUpdate(
           {_id: context.user._id},
           {$push: {savedBooks: input}},
           {new:true}
         )
         return updatedUser;
       }
       throw new AuthenticationError("Not logged in");
     },

    // remove a book
    removeBook: async (parent, { bookId }, context) =>{
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {savedBooks: {bookId}}},
          {new:true}
        )
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    }
  },
};
module.exports = resolvers;

