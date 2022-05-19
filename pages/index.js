import Header from "../components/header";
import { useStore } from "effector-react";
import { createEvent, createStore } from "effector";
import { deletePost } from "../effects/effects";
import s from "../styles/Home.module.css";

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
      <main>
        <div className={s.containerList}>
          <ul className={s.listPost}>
            {!Array.isArray(posts) && posts && (
              <li className={s.listItem}>
                <h1 className={s.titlePost}>Title: {posts.title} </h1>
                <p>Text: {posts.body}</p>
                <button
                  className={s.buttonList}
                  id={posts.id}
                  onClick={delPost}
                >
                  Delete
                </button>
              </li>
            )}
            {Array.isArray(posts) &&
              posts.map((post) => (
                <li className={s.listItem} key={post.id}>
                  <h1 className={s.titlePost}>Title: {post.title}</h1>
                  <p>Text: {post.body}</p>
                  <button
                    className={s.buttonList}
                    id={post.id}
                    onClick={delPost}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </main>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}
