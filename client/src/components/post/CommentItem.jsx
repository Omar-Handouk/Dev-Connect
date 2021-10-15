import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import formatDate from '../../utils/formatDate'

const CommentItem = ({ comment: { _id: commentId, user: { _id: userId, name, avatar } , body, date }, isOwner, removeComment, postId }) => {
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
                {isOwner ? <button type="button" className="btn btn-danger" onClick={() => removeComment(postId, commentId)}><i className="fas fa-times"></i></button> : null}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    isOwner: PropTypes.bool.isRequired,
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

export default CommentItem
