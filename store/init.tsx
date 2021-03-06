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
  AllPostsFx,
  getPostIdFx,
  deletePostFx,
  addPostFx,
  changePostFx,
} from ".";


import { IPosts } from "../interfaces/interfaces";
import Notiflix from "notiflix";

$addTitle
  .on(addTitle, (_, e) => {
    const { value } = e.target as HTMLInputElement;
    return  value;
  })
  .reset(reset);

$addText
  .on(addText, (_, e) => {
    const { value } = e.target as HTMLInputElement;
    return value;
  })
  .reset(reset);

$modalStore
  .on(modal, ({toggle}, e) => {
    const { id,textContent } = e.target as HTMLButtonElement;
    return {
      toggle: !toggle,
      textButton: textContent,
      id: id,
    };
  })
  .on(addPostFx, ({toggle, textButton, id}) => {
        return {
      toggle: !toggle,
      textButton,
      id,
    };
  })
  .on(changePostFx, ({toggle, textButton, id}) => {
            return {
      toggle: !toggle,
      textButton,
      id,
    };
  });

$userId
  .on(valueIdPost, (_, e) => {
    const { value } = e.target as HTMLInputElement;
    if (Number(value) > 100 || Number(value) < 0) {
      Notiflix.Notify.info("Enter a number from 1 to 100");
      return;
    }
    return value;
  })
  .reset(reset);

$posts
  .on(AllPostsFx.doneData, (_, res: IPosts[]) => {
    return res;
  })
  .on(getPostIdFx.doneData, (_, res: IPosts[]) => {
    return res;
  })
  .on(deletePostFx.doneData, (state, res: IPosts) => {
    const newState: IPosts[] = state.filter((data) => data.id !== res.id);
    Notiflix.Notify.success(`Post ${res.id} delete`);
    return newState;
  })
  .on(addPostFx.doneData, (state, res: IPosts[]) => {
    if (!state) {
      return res;
    }
    return [...res ,...state];
  })
  .on(changePostFx.doneData, (state, res: IPosts) => {
    const changePost = state.map(({title, body, id}) => {
      if (title !== res.title && body === res.body) {
        title = res.title
      }
      if(body !== res.body && title === res.title) {
        body = res.body
      }
      if (id === res.id) {
        title = res.title;
        body = res.body;
      }
      return {title, body, id};
    });
    return changePost;
  });

export {
  $posts,
  $userId,
  $modalStore,
  $addText,
  $addTitle,
};
