const express = require( 'express' );
const { graphqlHTTP } = require( 'express-graphql' );
const schema = require( './schema/schema' );
const mongoose = require( 'mongoose' );
const cors = require("cors");

const app = express();

app.use(cors());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    }),
)
mongoose.connect( "mongodb://localhost:27017/authors" )
mongoose.connection.once( 'open', () => {
    console.log( 'connected to data base' )
} )


// bind express with graphql
app.use( '/graphql', cors(),
    graphqlHTTP( {
        schema,
        graphiql: true
    } ) );


const PORT = 4000;

app.listen( PORT, () => {
    console.log( `Server is listening on port ${ PORT }` )
} )