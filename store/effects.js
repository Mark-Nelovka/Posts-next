import { createEvent, createStore, createEffect } from "effector";

const AllPostsFx = createEffect();
const getPostIdFx = createEffect();
const addPostFx = createEffect();
const valueIdPost = createEvent();
const deletePostFx = createEffect();
const changePostFx = createEffect();

const reset = createEvent();
const modal = createEvent();
const addTitle = createEvent();
const addText = createEvent();

let $posts = createStore(null);
let $userId = createStore("");
let $modalStore = createStore({
  toggle: false,
  textButton: "",
  id: "",
});
let $addText = createStore("");
let $addTitle = createStore("");

export {
  AllPostsFx,
  $posts,
  getPostIdFx,
  valueIdPost,
  $userId,
  reset,
  deletePostFx,
  $modalStore,
  modal,
  addText,
  addPostFx,
  $addText,
  addTitle,
  $addTitle,
  changePostFx,
};
