import { createStore, createApi } from "effector";
import { useStore } from "effector-react";
import s from "../styles/Modal.module.css";
import { postPosts } from "../effects/effects";
import { changePosts } from "../effects/effects";

const $addText = createStore("");
const $addTextA = createStore("");

const { inputAddText } = createApi($addText, {
  inputAddText: (state, evt) => {
    const { value } = evt.target;

    state = value;
    return state;
  },
});

const { textaAddText } = createApi($addTextA, {
  textaAddText: (state, evt) => {
    const { value } = evt.target;

    state = value;
    return state;
  },
});

function Modal({ open, openModal, onClick, changePostIdS }) {
  const addText = useStore($addText);
  const addTextA = useStore($addTextA);

  const addPost = (e) => {
    e.preventDefault();
    postPosts({ addText, addTextA, openModal, onClick, changePostIdS });
  };

  const postChange = (e) => {
    e.preventDefault();
    changePosts({
      addText,
      addTextA,
      openModal,
      onClick,
      changePostIdS,
    });
  };

  const closeModal = (e) => {
    const { nodeName } = e.target;
    if (nodeName === "DIV") {
      closeModalAdd();
      return;
    }

    return;
  };

  return (
    <>
      {open && (
        <div onClick={closeModal} className={s.fixedOverlay}>
          <div className={s.modal}>
            <form onSubmit={addPost} className={s.modalContainer}>
              <label>
                <input
                  className={s.inputTitle}
                  type="text"
                  placeholder="Title"
                  onChange={inputAddText}
                  required
                />
              </label>
              <textarea
                className={s.textA}
                placeholder="Text"
                onChange={textaAddText}
                required
              ></textarea>
              <button className={s.btnAddPost} type="submit">
                Add post
              </button>
            </form>
          </div>
        </div>
      )}
      {open && changePostIdS && (
        <div onClick={closeModal} className={s.fixedOverlay}>
          <div className={s.modal}>
            <form onSubmit={postChange} className={s.modalContainer}>
              <label>
                <input
                  className={s.inputTitle}
                  type="text"
                  placeholder="Title"
                  onChange={inputAddText}
                  required
                />
              </label>
              <textarea
                className={s.textA}
                placeholder="Text"
                onChange={textaAddText}
                required
              ></textarea>
              <button className={s.btnAddPost} type="submit">
                Change post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
