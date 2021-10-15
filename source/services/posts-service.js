'use strict';

const Post = require('../../models/Post.model');

const index = async () => await Post.find({}).populate('user', '-password').populate('comments.user', '-password').sort({date: 'desc'});

const create = async (userId, data) => {
    let doc = {
        user: userId,
        title: data.title,
        body: data.body
    };

    const post = await Post.create(doc);

    return Promise.resolve(await post.populate('user', '-password'));
};

const show = async (postId) => {
    const post = await Post.findById(postId).populate('user', '-password').populate('comments.user', '-password');

    return Promise.resolve(post);
};

const update = async (postId, data) => {
    const doc = {};

    if (data.title) {
        doc.title = data.title;
    }

    if (data.body) {
        doc.body = data.body;
    }

    const post = await Post.findByIdAndUpdate(postId, doc, {new: true});

    return Promise.resolve(post);
};

const destroy = async (postId) => {
    const post = await Post.findByIdAndDelete(postId);

    return Promise.resolve(post);
};

const userPosts = async (userId) => {
    const posts = await Post.find( { user: userId }).populate('user', '-password').populate('comments.user', '-password');

    return Promise.resolve(posts);
};

const like = async (userId, postId) => {
    /*
     * Find post by id
     * Check if likes array contains user id
     * If condition is true, return a rejection
     * else return a resolve with likes array
     */
    const post = await Post.findById(postId);

    if (post.likes.some(like => like.user.toString() === userId)) {
        return Promise.reject(new Error('Post already liked'));
    }

    post.likes.push({ user: userId});

    await post.save();

    return Promise.resolve(post.likes);
};

const unlike = async (userId, postId) => {
    const post = await Post.findById(postId);

    const previousLength = post.likes.length;

    const likes = post.likes.filter(like => like.user.toString() !== userId);

    if (likes.length === previousLength) {
        return Promise.reject(new Error('Post not liked'));
    }

    post.likes = likes;

    await post.save();

    return Promise.resolve(post.likes);
};

const comment = async (userId, postId, data) => {
    const post = await Post.findById(postId);

    const doc = {
        user: userId,
        body: data.body
    };

    post.comments.unshift(doc);

    await post.save();

    return Promise.resolve((await post.populate('comments.user', '-password')).comments);
};

const uncomment = async (userId, postId, commentId) => {
    const post = await Post.findById(postId);

    const previousLength = post.comments.length;

    const comments = post.comments.filter(comment => comment.id.toString() !== commentId);

    if (previousLength === comments.length) {
        return Promise.reject(new Error('Comment not found'));
    }

    if (!post.comments.some(comment => comment.user.toString() === userId)) {
        return Promise.reject(new Error('Un-authorized user'));
    }

    post.comments = comments;

    await post.save();

    return Promise.resolve((await post.populate('comments.user', '-password')).comments);
};

module.exports = {
    index,
    create,
    show,
    update,
    destroy,
    userPosts,
    like,
    unlike,
    comment,
    uncomment
};