const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
require('dotenv').config();
const { authCheck } = require('./helpers/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');

// express server
const app = express();

// db
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
};
// execute database connection
db();

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
// resolvers
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});

// applyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app);

// rest endpoint
app.get('/rest', authCheck, function(req, res) {
    res.json({
        data: 'you hit rest endpoint great!'
    });
});

// upload
app.post('/uploadimages', (req, res) => {
    cloudinary.uploader.upload(
        req.body.image,
        (result) => {
            res.send({
                url: result.url,
                public_id: result.public_id
            });
        },
        {
            public_id: `${Date.now()}`, // public name
            resource_type: 'auto' // JPEG, PNG
        }
    );
});

// port
app.listen(process.env.PORT, function() {
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});
