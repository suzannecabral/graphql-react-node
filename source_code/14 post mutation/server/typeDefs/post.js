const { gql } = require('apollo-server-express');

module.exports = gql`
    type Post {
        id: ID!
        title: String!
        description: String!
    }
    type Query {
        totalPosts: Int!
        allPosts: [Post!]!
    }
    # mutations
    type Mutation {
        newPost(title: String!, description: String!): Post!
    }
`;
