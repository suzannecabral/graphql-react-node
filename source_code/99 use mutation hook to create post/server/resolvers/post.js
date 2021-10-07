const { gql } = require('apollo-server-express');
const { posts } = require('../temp');
const { authCheck } = require('../helpers/auth');
const { DateTimeResolver } = require('graphql-scalars');
const Post = require('../models/post');
const User = require('../models/user');

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

const allPosts = async (parent, args) => {
    return await Post.find({})
        .populate('postedBy', 'username _id')
        .exec();
};

const postsByUser = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    const currentUserFromDb = await User.findOne({
        email: currentUser.email
    }).exec();

    return await Post.find({ postedBy: currentUserFromDb })
        .populate('postedBy', '_id username')
        .sort({ createdAt: -1 });
};

module.exports = {
    Query: {
        allPosts,
        postsByUser
    },
    Mutation: {
        postCreate
    }
};
