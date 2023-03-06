const graphql = require( 'graphql' );
const _ = require( 'lodash' );
const { GraphQLInt } = require( "graphql" );

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const Book = require( "../model/book" );
const Author = require( "../model/author" );


const BookType = new GraphQLObjectType( {
    name: 'Book',
    fields: () => ( {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log( parent )
                //return _.find( authors, { id: parent.authorID } )
                return Author.findById( parent.authorId )
            }
        }
    } )
} );

const AuthorType = new GraphQLObjectType( {
    name: 'Author',
    fields: () => ( {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList( BookType ),
            resolve(parent, args) {
                //return _.filter( books, { authorID: parent.id } );
                return Book.find( {
                    authorId: parent.id
                } )
            }
        }
    } )
} );

const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {

        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                console.log( typeof ( args.id ) )
                //return _.find( books, { id: args.id } );
                return Book.findById( args.id )
            }
        },

        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find( authors, { id: args.id } )
                return Author.findById( args.id )
            }
        },

        books: {
            type: new GraphQLList( BookType ),
            resolve(parent, args) {
                //return books
                return Book.find( {} );
            }
        },

        authors: {
            type: new GraphQLList( AuthorType ),
            resolve(parent, args) {
                //return authors
                return Author.find( {} )
            }
        }

    },

} );

//What allows edit, create etc our data.
//GraphQL you need to explicitly say what data can be mutated
const Mutation = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {

        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                age: { type: new GraphQLNonNull( GraphQLInt ) },
            },
            resolve(parent, args) {
                let author = new Author( {
                    name: args.name,
                    age: args.age
                } );
                return author.save();
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                genre: { type: new GraphQLNonNull( GraphQLString ) },
                authorId: { type: new GraphQLNonNull( GraphQLID ) }
            },
            resolve(parent, args) {
                let book = new Book( {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                } );
                return book.save();
            }
        },

        updateBook: {
            type: BookType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Book.findByIdAndUpdate( args.id,
                    {
                        $set: {
                            name: args.name,
                            genre: args.genre,
                            authorId: args.authorId
                        },
                    },
                    { new: true }
                );

            }
        }
    }
} )

module.exports = new GraphQLSchema( {
    query: RootQuery,
    mutation: Mutation
} );