import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_BOOK_QUERY } from "../queries/queries";



function BookDetails({bookId}) {

// const [GetBook] = useQuery(GET_BOOK_QUERY, {
//     variables: {id: bookId}
// });

console.log()
    return (
        <div>
            <p>Output book details </p>

            <h1>{ bookId }</h1>

        </div>
    )
}

export default  (BookDetails);