const express = require( 'express' );
const { graphqlHTTP } = require( 'express-graphql' );
const schema = require( './schema/schema' );
const mongoose = require('mongoose');


const app = express();

mongoose.connect("mongodb://localhost:27017/authors")
mongoose.connection.once('open', () => {
    console.log('connected to data base')
})
// bind express with graphql
app.use( '/graphql', graphqlHTTP( {
    schema,
    graphiql: true
} ) );


const PORT = 4000;

app.listen( PORT, () => {
    console.log(`Server is listening on port ${ PORT }`)
} )