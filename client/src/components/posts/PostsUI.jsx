import { Fragment } from 'react'
import PropTypes from 'prop-types'

import PostForm from './PostForm'
import PostItem from './PostItem'

const PostsUI = ({ posts, postText, onChange, onSubmit, updateLikes, deletePost, auth }) => {
    return (
        <Fragment>
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

            <PostForm postText={postText} onChange={onChange} onSubmit={onSubmit} />

            <div className="posts">
                {posts.length > 0 ? posts.map((post, index) => <PostItem 
                                                                    key={index} 
                                                                    post={post} 
                                                                    updateLikes={updateLikes} 
                                                                    deletePost={deletePost} 
                                                                    auth={auth} />) : <h3>No Posts</h3>}
            </div>

        </Fragment>
    )
}

PostsUI.propTypes = {
    posts: PropTypes.array.isRequired,
    postText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    updateLikes: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

export default PostsUI