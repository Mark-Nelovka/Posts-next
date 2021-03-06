import Header from "../components/header";
import { IPosts } from "../interfaces/interfaces";

import { useStore } from "effector-react";
import s from "../styles/Home.module.css";
import { $posts } from "../store/init";
import { deletePostFx } from "../Api";
import { modal } from '../store';

export default function Home() {
const posts: IPosts[] = useStore($posts);

  return (
    <>
      <Header />
      <main>
        <div className={s.containerList}>
          <ul className={s.listPost}>
            {posts &&
              posts.map(({ id, title, body }) => (
                <li className={s.listItem} key={id}>
                  <h1 className={s.titlePost}>Title: {title}</h1>
                  <p>Text: {body}</p>
                  <div className={s.containerButton}>
                    <button
                      className={s.buttonList}
                      id={id}
                      onClick={() => deletePostFx(id)}
                    >
                      Delete
                    </button>
                    <button
                      className={s.buttonListChange}
                      id={id}
                      onClick={modal}
                    >
                      Change post
                    </button>
                  </div>
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
