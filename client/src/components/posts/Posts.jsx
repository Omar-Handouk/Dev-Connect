import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner';
import PostsUI from './PostsUI';
import { getPostsAsync, addPostAsync, updateLikesAsync, deletePostAsync } from '../../actions/postAction';

export const Posts = ({ getPostsAsync, addPostAsync, updateLikesAsync, deletePostAsync, post: { isLoading, posts }, auth }) => {

    const [postText, setPostText] = useState('');

    const onChange = e => setPostText(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        addPostAsync(postText);
        setPostText('');
    }

    useEffect(() => getPostsAsync(), [getPostsAsync]);

    return (
        isLoading ? <Spinner /> : <PostsUI 
                                    posts={posts} 
                                    postText={postText} 
                                    onChange={onChange} 
                                    onSubmit={onSubmit} 
                                    updateLikes={updateLikesAsync} 
                                    deletePost={deletePostAsync}
                                    auth={auth} />
    )
}

Posts.propTypes = {
    getPostsAsync: PropTypes.func.isRequired,
    addPostAsync: PropTypes.func.isRequired,
    updateLikesAsync: PropTypes.func.isRequired,
    deletePostAsync: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
})

const mapDispatchToProps = {
    getPostsAsync,
    addPostAsync,
    updateLikesAsync,
    deletePostAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
