const { gql } = require('apollo-server-express');

module.exports = gql`
    type Post {
        _id: ID!
        content: String
        image: Image
        postedBy: User
    }
    # input type
    input PostCreateInput {
        content: String!
        image: ImageInput
    }
    type Query {
        totalPosts: Int!
        allPosts: [Post!]!
    }
    # mutations
    type Mutation {
        postCreate(input: PostCreateInput!): Post!
    }
`;
