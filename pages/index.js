import Header from "../components/header";
import { useStore } from "effector-react";
import { createEvent, createStore } from "effector";
import { deletePost } from "../effects/effects";

const handlePosts = createEvent();

let $posts = createStore(null).on(handlePosts, (_, posts) => {
  return posts;
});

export default function Home() {
  const posts = useStore($posts);
  const delPost = (e) => {
    const { id } = e.target;
    deletePost(id);
  };

  return (
    <>
      <Header onClick={handlePosts} />
      <div>
        <ul>
          {!Array.isArray(posts) && posts && (
            <li>
              <h1>Title: {posts.title} </h1>
              <p>Text: {posts.body}</p>
              <button id={posts.id} onClick={delPost}>
                Delete
              </button>
            </li>
          )}
          {Array.isArray(posts) &&
            posts.map((post) => (
              <li key={post.id}>
                <h1>Title: {post.title}</h1>
                <p>Text: {post.body}</p>
                <button id={post.id} onClick={delPost}>
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}
