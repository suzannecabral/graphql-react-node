const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
// const { PORT } = process.env;
require("dotenv").config();

// express server
const app = express();

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
// error: see https://www.udemy.com/course/graphql-react-node/learn/lecture/19712132#questions/15385664

let apolloServer = null;
async function startServer() {
	apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
}
startServer();

// server
const httpserver = http.createServer(app);

// rest endpoint
app.get("/rest", function (req, res) {
	res.json({
		data: "you hit the rest endpoint, great!",
	});
});

// port
app.listen(process.env.PORT, function () {
	console.log(`server is ready at http://localhost:${process.env.PORT}`);
	console.log(
		`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
	);
});
