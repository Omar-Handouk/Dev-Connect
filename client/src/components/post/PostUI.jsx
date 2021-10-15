import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const PostUI = ({ 
    post: { _id: postId, user: { _id: userId, name, avatar }, body, comments},
    auth: { isAuthenticated, isLoading, user },
    commentText,
    onChange,
    onSubmit,
    removeComment}) => {
    
    return (
        <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>

            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profiles/${userId}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {body}
                    </p>
                </div>
            </div>

            <CommentForm commentText={commentText} onChange={onChange} onSubmit={onSubmit} />

            <div className="comments">
                {comments.length > 0 ? 
                comments.map((comment, index) => <CommentItem key={index} comment={comment} isOwner={isAuthenticated && !isLoading && comment.user._id === user.id} removeComment={removeComment} postId={postId} />)
                : 'No Comments'}
            </div>
        </Fragment>
    )
}

PostUI.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    commentText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
}

export default PostUI
