import React from 'react';
import { useQuery } from "@apollo/client";
import {GET_BOOKS_QUERY} from "../queries/queries";


function BookList() {
    const { data, loading, error } = useQuery( GET_BOOKS_QUERY );

    if (loading) return 'Loading...';
    if (error) return <pre>{ error.message }</pre>
    // console.log( data )
    return (
        <div>
            <ul>
                {data.books && data.books.map( book => (
                    <li key={book.id}>{ book.name }</li>
                ) ) }

            </ul>
        </div>
    )
}

export default BookList;