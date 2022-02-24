// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  input savedBookInput {
    authors: [String]
    description: String
    bookId: String
    image: String 
    link: String
    title: String
}
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBookInput):User
    removeBook(bookId: String):User
  }
`;

// export the typeDefs
module.exports = typeDefs;

// Query Type
// me which returns a user - done
// Mutation type
// login : accepts and email and password as a returns and Auth Type- done
// addUser: accepts a username, meail ans password, returns an auth type - done
// saveBook: accepts a book author's array, description, title, bookID, image and link as paramters, returns User type (look into creating user type for all these paramters)
//remove book: accepts a bookID and rerns a User type

// User Type
// _id - done
// username- done
//email - done
//bookCount
//savedBooks (this will be an array of the Book type)

// Book Tpye
//  bookId (not the _id but the book's id value from Googles Book API)
// authors (an array of strings as there may be more thans one author)
// description
// title
// image
// link

// Authtype
// token - done
// user (references user type)- done
