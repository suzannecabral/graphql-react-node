const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
require('dotenv').config();

// express server
const app = express();

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
// resolvers
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

// applyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app);

// rest endpoint
app.get('/rest', function(req, res) {
    res.json({
        data: 'you hit rest endpoint great!'
    });
});

// port
app.listen(process.env.PORT, function() {
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});
