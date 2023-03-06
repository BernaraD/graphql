import { gql } from "@apollo/client";

//GET ALL BOOKS
const GET_BOOKS_QUERY = gql`
 {
  books {
    name
    id
  }
}
`;

//GET BOOK BY ID
const GET_BOOK_QUERY = gql`
    query GetBook($id: String){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

const GET_AUTHORS_QUERY = gql`
{
  authors {
    name
    age
    id
   
  }
}
`;



export {
    GET_BOOKS_QUERY,
    GET_AUTHORS_QUERY,
    GET_BOOK_QUERY
};