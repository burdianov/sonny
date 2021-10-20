import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

import Post from './post';

const Posts = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div className="">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          avatar={post.data().profileImg}
          image={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
