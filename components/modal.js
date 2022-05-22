import { useStore } from "effector-react";
import s from "../styles/Modal.module.css";
import {
  addText,
  $addText,
  addPostFx,
  addTitle,
  $addTitle,
  changePostFx,
  $modalStore,
  $posts,
  modal,
} from "../store/init";
import Image from "next/image";
import cLoseImg from "../images/Close.svg";

function Modal({ textButton }) {
  const textTitle = useStore($addTitle);
  const textArea = useStore($addText);
  const posts = useStore($posts);
  const { id } = useStore($modalStore);
  return (
    <>
      <div className={s.fixedOverlay}>
        <div className={s.modal}>
          <button onClick={modal} className={s.buttonCloseModal}>
            <Image
              width="15"
              height="15"
              className={s.imgClose}
              src={cLoseImg}
              alt="Close icon"
            />
          </button>
          {textButton === "Add post" ? (
            <form
              onSubmit={(e) => addPostFx({ e, textTitle, textArea })}
              className={s.modalContainer}
            >
              <label>
                <input
                  className={s.inputTitle}
                  type="text"
                  placeholder="Title"
                  onChange={addTitle}
                  required
                  name="addTitle"
                  value={textTitle}
                />
              </label>
              <textarea
                className={s.textA}
                placeholder="Text"
                onChange={addText}
                required
                name="addTextArea"
                value={textArea}
              ></textarea>
              <button className={s.btnAddPost} type="submit">
                {textButton}
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) =>
                changePostFx({ e, id, textTitle, textArea, posts })
              }
              className={s.modalContainer}
            >
              <label>
                <input
                  className={s.inputTitle}
                  type="text"
                  placeholder="Title"
                  onChange={addTitle}
                  name="addTitle"
                  value={textTitle}
                />
              </label>
              <textarea
                className={s.textA}
                placeholder="Text"
                onChange={addText}
                name="addTextArea"
                value={textArea}
              ></textarea>
              <button className={s.btnAddPost} type="submit">
                {textButton}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
