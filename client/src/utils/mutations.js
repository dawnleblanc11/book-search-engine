
// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.- done

// ADD_USER will execute the addUser mutation.- done

// SAVE_BOOK will execute the saveBook mutation.

// REMOVE_BOOK will execute the removeBook mutation.

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: savedBookInput) {
    saveBook(input: $input){
        _id
        username
        email
        bookCount 
        savedBooks {
            authors 
            bookId
            description
            title 
            image
            link
            
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount 
        savedBooks {
          authors 
          bookId
          description
          title 
          image
          link
        }
    }
}
`;
