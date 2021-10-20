/* eslint-disable @next/next/no-img-element */
import { SyntheticEvent, useEffect, useState } from 'react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from '@firebase/firestore';
import Moment from 'react-moment';

import { db } from '../firebase';

export interface PostType {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
}

const Post = ({
  id,
  username,
  avatar: profileImg,
  image,
  caption
}: PostType) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'posts', id, 'likes')), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes, session?.user.uid]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
        username: session?.user.username
      });
    }
  };

  const sendComment = async (e: SyntheticEvent) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session!.user.username,
      userImage: session!.user.image,
      timestamp: serverTimestamp()
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={profileImg}
          alt="avatar"
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={image} alt="picture" className="object-cover w-full" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <div>
            <BookmarkIcon className="btn" />
          </div>
        </div>
      )}

      <div className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </div>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold mr-2">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
