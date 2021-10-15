import React from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ commentText, onChange, onSubmit }) => {
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={onSubmit}>
                <textarea
                    name="commentText"
                    value={commentText}
                    onChange={onChange}
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    commentText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default CommentForm