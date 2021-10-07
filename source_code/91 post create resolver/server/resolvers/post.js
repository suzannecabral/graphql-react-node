const { gql } = require('apollo-server-express');
const { posts } = require('../temp');
const { authCheck } = require('../helpers/auth');
const { DateTimeResolver } = require('graphql-scalars');

// queries

// mutation
const postCreate = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    // validation
    if (args.input.content.trim() === '') throw new Error('Content is required');

    const currentUserFromDb = await User.findOne({
        email: currentUser.email
    });
    let newPost = await new Post({
        ...args.input,
        postedBy: currentUserFromDb._id
    })
        .save()
        .then((post) => post.populate('postedBy', '_id username').execPopulate());

    return newPost;
};

module.exports = {
    Query: {},
    Mutation: {
        postCreate
    }
};
