import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';

const PostCard = ({ post, handleDelete = (f) => f, showUpdateButton = false, showDeleteButton = false }) => {
    const { image, content, postedBy } = post;
    return (
        <div className="card text-center" style={{ minHeight: '375px' }}>
            <div className="card-body">
                <Image image={image} />
                <h4 className="text-primary">@{post.postedBy.username}</h4>
                <hr />
                <small>{content}</small>
                <br />
                <br />
                {showDeleteButton && (
                    <button onClick={() => handleDelete(post._id)} className="btn m-2 btn-danger">
                        Delete
                    </button>
                )}
                {showUpdateButton && <button className="btn m-2 btn-warning">Update</button>}
            </div>
        </div>
    );
};

export default PostCard;
