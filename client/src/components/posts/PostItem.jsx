import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const PostItem = ({ 
    post: { _id: postId, user: { _id: userId, name, avatar }, body, likes, comments, date}, 
    updateLikes, 
    deletePost, 
    auth: { isAuthenticated, isLoading, user } }) => {
    
    return (
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
                <p className="post-date">
                    {`Posted on ${formatDate(date)}`}
                </p>
                <button type="button" className="btn btn-light" onClick={() => updateLikes(postId)}>
                    <i className="fas fa-thumbs-up"></i>
                    <span>{` ${likes.length}`}</span>
                </button>
                <button type="button" className="btn btn-light" onClick={() => updateLikes(postId, false)}>
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/posts/${postId}`} className="btn btn-primary">
                    Discussion <span className='comment-count'>{comments.length}</span>
                </Link>


                {isAuthenticated && !isLoading && user.id === userId ? <button type="button" className="btn btn-danger" onClick={() => deletePost(postId)}><i className="fas fa-times"></i></button> : null}
            </div>
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    updateLikes: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

export default PostItem

