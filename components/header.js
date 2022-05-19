import s from "../styles/Header.module.css";
import { createStore, createApi } from "effector";
import { useStore } from "effector-react";
import Notiflix from "notiflix";
import { AllPosts } from "../effects/effects";
import { getPostIdEf } from "../effects/effects";
import Modal from "../components/modal";

let $searchId = createStore("");
const $changePostId = createStore("");
const $modalAdd = createStore(false);
const $modalChange = createStore(false);

const { openModalChange } = createApi($modalChange, {
  openModalChange: (state) => {
    if ($changePostId.stateRef.current === "") {
      Notiflix.Notify.warning("Specify user ID");
      return;
    }
    return !state;
  },
});

const { openModal } = createApi($modalAdd, {
  openModal: (state, evt) => {
    return !state;
  },
});

const { changeId } = createApi($searchId, {
  changeId: (state, evt) => {
    const { value } = evt.target;
    state = value;
    return state;
  },
});

const { changePostId } = createApi($changePostId, {
  changePostId: (state, evt) => {
    const { value } = evt.target;
    state = value;
    return state;
  },
});

function Header({ onClick }) {
  let searchIdS = useStore($searchId);
  const changePostIdS = useStore($changePostId);
  const modalPost = useStore($modalAdd);
  const modalChange = useStore($modalChange);

  const allPosts = () => {
    AllPosts(onClick);
  };

  const getPostId = () => {
    getPostIdEf({ onClick, searchIdS });
  };

  return (
    <header className={s.header}>
      <div className={s.navContainer}>
        <nav className={s.navigation}>
          <ul className={s.navList}>
            <li className={s.navItem}>
              <button onClick={allPosts} className={s.navButton}>
                Fetch all posts
              </button>
            </li>
            <li className={s.navItem}>
              <button onClick={getPostId} className={s.navButton}>
                Fetch post id:
              </button>
              <input
                onChange={changeId}
                type="number"
                value={searchIdS}
                className={s.input}
                pattern="[1-100]"
              />
            </li>
            <li className={s.navItem}>
              <button onClick={openModal} className={s.navButton}>
                Add post
              </button>
              {modalPost && (
                <Modal
                  open={modalPost}
                  openModal={openModal}
                  onClick={onClick}
                />
              )}
            </li>
            <li className={s.navItem}>
              <button onClick={openModalChange} className={s.navButton}>
                Put post:
              </button>
              <input
                onChange={changePostId}
                type="number"
                value={changePostIdS}
                className={s.input}
                pattern="[1-100]"
              />
            </li>
            {modalChange && (
              <Modal
                open={modalChange}
                openModal={openModalChange}
                onClick={onClick}
                changePostIdS={changePostIdS}
              />
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
