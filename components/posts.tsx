import Post, { PostType } from './post';

const posts: PostType[] = [
  {
    id: '123',
    username: 'john',
    avatar: 'https://links.papareact.com/3ke',
    img: 'https://links.papareact.com/3ke',
    caption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quasi tempora iste impedit, in explicabo deleniti soluta dolorem totam similique facere eius nisi consequuntur ea!'
  },
  {
    id: '456',
    username: 'mudium',
    avatar: 'https://links.papareact.com/3ke',
    img: 'https://links.papareact.com/3ke',
    caption:
      'sit amet consectetur adipisicing elit. Nemo quasi tempora iste impedit, in explicabo deleniti soluta dolorem totam similique facere eius nisi consequuntur ea!'
  }
];

const Posts = () => {
  return (
    <div className="">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          avatar={post.avatar}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
