import {gql} from '@apollo/client';

const ADD_BOOK_MUTATION = gql`
 mutation ($name: String!, $genre: String!, $authorId: ID! ){
        
    addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
       
    }
`;

// const UPDATE_BOOK_BY_ID = gql`
// mutation ($id: ID!, $name: String, $genre: String!, $authorId: ID){
//
//    updateBook(id: $id) {
//      name
//      genre
//      authorId
//    }
// }
//
// `
export {
    ADD_BOOK_MUTATION,
    // UPDATE_BOOK_BY_ID
}