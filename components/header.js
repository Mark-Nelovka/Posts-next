import s from "../styles/Header.module.css";
import {
  AllPostsFx,
  valueIdPost,
  $userId,
  getPostIdFx,
  modal,
  $modalStore,
} from "../store/init";
import { useStore } from "effector-react";

import Modal from "./modal";

function Header() {
  const userId = useStore($userId);
  const { toggle, textButton } = useStore($modalStore);

  return (
    <header className={s.header}>
      <div className={s.navContainer}>
        <nav className={s.navigation}>
          <ul className={s.navList}>
            <li className={s.navItem}>
              <button onClick={AllPostsFx} className={s.navButton}>
                All posts
              </button>
            </li>
            <li className={s.navItem}>
              <button
                onClick={() => getPostIdFx(userId)}
                className={s.navButton}
              >
                Get post id:
              </button>
              <input
                type="number"
                className={s.input}
                onChange={valueIdPost}
                value={userId}
                min="1"
                max="100"
              />
            </li>
            <li className={s.navItem}>
              <button onClick={modal} className={s.navButton}>
                Add post
              </button>
              {toggle && <Modal textButton={textButton} />}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
