'use strict';

const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const time = require('../../../../utils/time');
const auth = require('../../../../middleware/authVerf');
const checkObjectId = require('../../../../middleware/checkObjectId');
const resourceExists = require('../../../../middleware/resourceWithIdExists');
const validation = require('../../../../validations/post.validation');
const { index, create, show, update, destroy, userPosts, like, unlike, comment, uncomment } = require('../../../services/posts-service');

/**
 * @route GET api/v1/posts/
 * @description Fetch all posts
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const posts = await index();
        res.status(200).json(posts);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

/**
 * @route GET /ap/v1/posts/user/:id
 * @description Fetch all posts for a particular user
 * @access Public
 */
router.get('/user/:id', checkObjectId('id'), resourceExists('id', 'user'), async (req, res) => {
    try {
        const posts = await userPosts(req.params.id);

        res.status(200).json(posts);
    } catch (err){
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

/**
 * @route POST /ap/v1/posts/
 * @description Create a new post for an authenticated user
 * @access Private
 */
router.post('/', auth, validation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = await create(req.user.id, req.body);

        res.status(201).json(post);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

/**
 * @route GET /ap/v1/posts/:id
 * @description Fetch a particular post
 * @access Public
 */
router.get('/:id', checkObjectId('id'), resourceExists('id', 'post'), async (req, res) => {
    try {
        const post = await show(req.params.id);

        res.status(200).json(post);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

/**
 * @route PUT /ap/v1/posts/:id
 * @description Update a certain post for an authenticated user
 * @checks Either Body or Title must be present
 * @access Private
 */
router.put('/:id', auth, checkObjectId('id'), resourceExists('id', 'post'), async (req, res) => {
    if (!req.body.title && !req.body.body) {
        return res.status(400).json({ errors: [ { msg: 'Either title or body must be present' } ]});
    }

    try {
        const post = await update(req.params.id, req.body);

        res.status(200).json(post);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }

});

/**
 * @route DELETE /ap/v1/posts/:id
 * @description Delete a certain post for an authenticated user
 * @access Private
 */
router.delete('/:id', auth, checkObjectId('id'), resourceExists('id', 'post'), async (req, res) => {
    try {
        const post = await destroy(req.params.id);

        res.status(200).json(post);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

/**
 * @route PUT /api/v1/posts/:id/like
 * @description Add a like for a particular post for an authenticated user
 * @access Private
 */
router.put('/:id/like', auth, checkObjectId('id'), resourceExists('id', 'post'), async (req, res) => {
    try {
        const likes = await like(req.user.id, req.params.id);

        res.status(200).json(likes);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

/**
 * @route PUT /api/v1/posts/:id/unlike
 * @description Remove a like for a particular post for an authenticated user
 * @access Private
 */
router.put('/:id/unlike', auth, checkObjectId('id'), resourceExists('id', 'post'), async (req, res) => {
    try {
        const likes = await unlike(req.user.id, req.params.id);

        res.status(200).json(likes);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});


/**
 * @route POST /api/v1/posts/:id/comment
 * @description Create a new comment for a particular post for an authenticated user
 * @access Private
 */
router.post('/:id/comment', auth, checkObjectId('id'), resourceExists('id', 'post'), body('body', 'Comment body is required').notEmpty(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const comments = await comment(req.user.id, req.params.id, req.body);

        res.status(201).json(comments);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

/**
 * @route DELETE /api/v1/posts/:id/comment/:commentId
 * @description Remove a comment for a particular post for an authenticated user
 * @important Make sure to check user id matches the user id in the comment
 * @access Private
 */
router.delete('/:id/comment/:commentId', auth, checkObjectId('id'), resourceExists('id', 'post'), async (req, res) => {
    try {
        const comments = await uncomment(req.user.id, req.params.id, req.params.commentId);

        res.status(200).json(comments);
    } catch (err) {
        console.error(`[Error][${time()}][${__filename}] > ${err.message}`);
        res.status(400).json({ errors: [ { msg: err.message } ]});
    }
});

module.exports = router;

/*
 * Any user can fetch all posts a certain post, or posts of a particular user
 * Only an authenticated user can create a new post, certain field must be present
 * Only an authenticated user with a particular id that matches the publisher of a post can update that post
 * Only an authenticated user with a particular id that matches the publisher of a post can delete that post
 * Only an authenticated user with a particular id can like a post
 * Only an authenticated user with a particular id can unlike a post
 * Only an authenticated user with a particular id can post a comment
 * Only an authenticated user with a particular id can delete a comment
*/