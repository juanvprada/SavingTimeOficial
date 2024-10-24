import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../services/services';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getOnePost(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <h1>{post.name}</h1>
      <img src={post.image} alt={post.name} />
      <p>{post.description}</p>
      {/* You can add edit and delete buttons here */}
    </div>
  );
};

export default PostDetail;
