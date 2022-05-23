import { createEvent, createStore, createEffect } from "effector";
import { IModal, IPosts } from "../interfaces/interfaces";

const AllPostsFx = createEffect();
const getPostIdFx = createEffect();
const addPostFx = createEffect();
const deletePostFx = createEffect();
const changePostFx = createEffect();


const reset = createEvent();
const valueIdPost = createEvent<React.ChangeEvent>();
const modal = createEvent<React.MouseEvent>();
const addTitle = createEvent<React.ChangeEvent>();
const addText = createEvent<React.ChangeEvent>();




let $posts = createStore<IPosts[]>(null);
let $userId = createStore("");
let $modalStore = createStore<IModal>({
  toggle: false,
  textButton: "",
  id: "",
});

let $addText = createStore("");
let $addTitle = createStore('');

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
