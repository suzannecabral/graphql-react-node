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
        .sort({ createdAt: -1 })
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

const singlePost = async (parent, args) => {
    return await Post.findById({ _id: args.postId })
        .populate('postedBy', '_id username')
        .exec();
};

const postUpdate = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    // validation
    if (args.input.content.trim() === '') throw new Error('Content is requried');
    //  get current user mongodb _id based in email
    const currentUserFromDb = await User.findOne({ email: currentUser.email }).exec();
    // _id of post to update
    const postToUpdate = await Post.findById({ _id: args.input._id }).exec();
    // if currentuser id and id of the post's postedBy user id is same, allow update
    if (currentUserFromDb._id.toString() !== postToUpdate.postedBy._id.toString())
        throw new Error('Unauthorized action');
    let updatedPost = await Post.findByIdAndUpdate(args.input._id, { ...args.input }, { new: true }).exec();
    return updatedPost;
};

const postDelete = async (parent, args, { req }) => {
    const currentUser = await authCheck(req);
    const currentUserFromDb = await User.findOne({ email: currentUser.email }).exec();
    const postToDelete = await Post.findById({ _id: args.postId }).exec();
    if (currentUserFromDb._id.toString() !== postToDelete.postedBy._id.toString())
        throw new Error('Unauthorized action');
    let deletedPost = await Post.findByIdAndDelete({ _id: args.postId }).exec();
    return deletedPost;
};

module.exports = {
    Query: {
        allPosts,
        postsByUser,
        singlePost
    },
    Mutation: {
        postCreate,
        postUpdate,
        postDelete
    }
};
