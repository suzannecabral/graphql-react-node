import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { SINGLE_POST } from '../../graphql/queries';
import omitDeep from 'omit-deep';
import { useParams } from 'react-router-dom';

const PostUpdate = () => {
    const [values, setValues] = useState({
        content: '',
        image: {
            url: '',
            public_id: ''
        }
    });
    const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);
    const [loading, setLoading] = useState(false);
    // router
    const { postid } = useParams();

    useMemo(() => {
        if (singlePost) {
            setValues({
                ...values,
                _id: singlePost.singlePost._id,
                content: singlePost.singlePost.content,
                image: omitDeep(singlePost.singlePost.image, ['__typename'])
            });
        }
    }, [singlePost]);

    useEffect(() => {
        console.log(postid);
        getSinglePost({ variables: { postId: postid } });
    }, []);

    return (
        <div className="container p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update</h4>}
            {JSON.stringify(values)}
        </div>
    );
};

export default PostUpdate;
