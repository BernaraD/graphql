import React, { useEffect, useState } from 'react';
import "./BookList.css"
import { useQuery } from "@apollo/client";
import { GET_BOOKS_QUERY } from "../queries/queries";
import BookDetails from "./BookDetails";
import { MdDeleteOutline } from "react-icons/md";


function BookList() {
    const { data, loading, error } = useQuery( GET_BOOKS_QUERY );

    let [bookId, setBookId] = useState( '' );

    if (loading) return 'Loading books...';
    if (error) return <pre>{ error.message }</pre>

    console.log( "Book id " + bookId )

       const onSelectBook = (id) => {
           setBookId(id);
           console.log(bookId)
       }


    return (
        <div className="book-list-item">
            <ul>
                { data.books && data.books.map( book => (
                    <li key={ book.id }
                        onClick={() => onSelectBook( book.id ) }>
                        { book.name }

                        <MdDeleteOutline/>
                    </li>
                ) ) }
            </ul>

            <hr/>
            <BookDetails bookId={ bookId }/>

        </div>
    )
}

export default BookList;