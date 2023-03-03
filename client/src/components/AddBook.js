import React, { useState } from 'react';
import { useMutation, useQuery, } from "@apollo/client";
import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY } from "../queries/queries";


function AddBook() {

    const { data, loading, error } = useQuery( GET_AUTHORS_QUERY );
    const [addBook] = useMutation( ADD_BOOK_MUTATION );

    const [newBook, setNewBook] = useState( {
        name: '',
        genre: '',
        authorId: ''
    } )

    const { name, genre, authorId } = newBook;

    const updateField = (e) => {
        setNewBook( {
            ...newBook,
            [e.target.name]: e.target.value
        } )
    }

    const displayAuthors = () => {
        if (loading) {
            return <option>Loading Authors</option>
        } else {
            return data.authors.map( author => {
                return ( <option key={ author.id } value={ author.id }>{ author.name }</option> )
            } )
        }
    }

    if (error) return <pre>{ error.message }</pre>


    const addBookBtnHandler = (e) => {
        e.preventDefault();
        console.log( newBook )

        addBook( {
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: GET_BOOKS_QUERY}]
        } )
    }

    return (
        <form onSubmit={ e => addBookBtnHandler(e) }>
            <div className="field">
                <label>Book name</label>
                <input type="text"
                       name="name"
                       value={ name }
                       onChange={ (e) => updateField( e ) }/>
            </div>

            <div className="field">
                <label>Genre</label>
                <input type="text"
                       name="genre"
                       value={ genre }
                       onChange={ (e) => updateField( e ) }/>
            </div>


            <div className="field">
                <label>Author</label>

                <select
                    name="authorId"
                    value={ authorId }
                    onChange={ (e) => updateField( e ) }>
                    <option>Select Author</option>
                    { displayAuthors() }
                </select>
            </div>

            <button>Add</button>
        </form>
    )
}

export default AddBook;