import React from 'react'
import PropTypes from 'prop-types'

const PostForm = ({ postText, onSubmit, onChange }) => {
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={onSubmit}>
                <textarea
                    name="postText"
                    value={postText}
                    onChange={onChange}
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    postText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default PostForm

