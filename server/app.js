const express = require( 'express' );
const { graphqlHTTP } = require( 'express-graphql' );
const schema = require( './schema/schema' );


const app = express();

// bind express with graphql
app.use( '/graphql', graphqlHTTP( {
    schema,
    graphiql: true
} ) );


const PORT = 4000;

app.listen( PORT, () => {
    console.log(`Server is listening on port ${ PORT }`)
} )