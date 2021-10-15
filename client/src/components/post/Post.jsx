import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getPostAsync, addCommentAsync, removeCommentAsync } from '../../actions/postAction'
import Spinner from '../layout/Spinner';
import PostUI from './PostUI'

export const Post = ({ match: { params }, post: { post, isLoading }, auth, getPostAsync, addCommentAsync, removeCommentAsync }) => {

    useEffect(() => getPostAsync(params.id), [getPostAsync, params.id]);

    const [commentText, setCommentText] = useState('');

    const onChange = e => setCommentText(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        addCommentAsync(post._id, { body: commentText });
        setCommentText('');
    }

    return (
       isLoading || !post ? <Spinner /> : <PostUI post={post} auth={auth} commentText={commentText} onChange={onChange} onSubmit={onSubmit} removeComment={removeCommentAsync} />
    )
}

Post.propTypes = {
    match: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getPostAsync: PropTypes.func.isRequired,
    addCommentAsync: PropTypes.func.isRequired,
    removeCommentAsync: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
})

const mapDispatchToProps = {
    getPostAsync,
    addCommentAsync,
    removeCommentAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
