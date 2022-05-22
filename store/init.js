import {
  $posts,
  valueIdPost,
  $userId,
  reset,
  modal,
  $modalStore,
  addText,
  $addText,
  addTitle,
  $addTitle,
} from "./effects";
import {
  AllPostsFx,
  getPostIdFx,
  deletePostFx,
  addPostFx,
  changePostFx,
} from "../Api";
import Notiflix from "notiflix";

$addTitle
  .on(addTitle, (_, e) => {
    const { value } = e.target;
    return value;
  })
  .reset(reset);

$addText
  .on(addText, (_, e) => {
    const { value } = e.target;
    return value;
  })
  .reset(reset);

$modalStore
  .on(modal, ({ toggle }, e) => {
    const { id } = e.target;
    return {
      toggle: !toggle,
      textButton: e.target.textContent,
      id: id,
    };
  })
  .on(addPostFx, (state) => {
    return !state.toggle;
  })
  .on(changePostFx, (state) => {
    return !state.toggle;
  });

$userId
  .on(valueIdPost, (_, e) => {
    const { value } = e.target;
    if (Number(value) > 100 || Number(value) < 0) {
      Notiflix.Notify.info("Enter a number from 1 to 100");
      return;
    }
    return value;
  })
  .reset(reset);

$posts
  .on(AllPostsFx.doneData, (_, res) => {
    return res;
  })
  .on(getPostIdFx.doneData, (_, res) => {
    return res;
  })
  .on(deletePostFx.doneData, (state, res) => {
    const newState = state.filter((data) => data.id !== res.id);
    Notiflix.Notify.success(`Post ${res.id} delete`);
    return newState;
  })
  .on(addPostFx.doneData, (state, res) => {
    if (!state) {
      return res;
    }
    return [...res, ...state];
  })
  .on(changePostFx.doneData, (state, res) => {
    const changePost = state.map((data) => {
      if (data.id === res.id) {
        data.title = res.title;
        data.body = res.body;
      }
      return data;
    });
    return changePost;
  });

export {
  AllPostsFx,
  $posts,
  valueIdPost,
  getPostIdFx,
  $userId,
  deletePostFx,
  $modalStore,
  modal,
  addText,
  $addText,
  addPostFx,
  addTitle,
  $addTitle,
  changePostFx,
};
