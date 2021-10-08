const express = require("express");
const { ApolloServer } = require("apollo-server");
const http = require("http");
require("dotenv").config();

// express server
const app = express();

const { ApolloServer } = require("apollo-server");
require("dotenv").config();

// types: query / mutation / subscription
const typeDefs = `
type Query {
  totalPosts: Int!
}
`;

// resolvers

const resolvers = {
	Query: {
		totalPosts: () => 42,
	},
};

// graphql server

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

// port
apolloServer.listen(process.env.PORT, function () {
	console.log(
		`graphql server is ready at http://localhost:${process.env.PORT}`
	);
});

// applyMiddleware

// rest endpoint
app.get("/rest", function (req, res) {
	res.json({
		data: "rest endpoint is working",
	});
});

// port
app.listen(process.env.PORT, function () {
	console.log(`server is ready at http://localhost:${process.env.PORT}`);
});
