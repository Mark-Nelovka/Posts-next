import { createEffect } from "effector";
import axios from "axios";
import Notiflix from "notiflix";
import { v4 } from "uuid";

const AllPosts = createEffect(async (onClick) => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const result = await res.data;
    onClick(result);
    return result;
  } catch (error) {
    Notiflix.Notify.info("Ooops, something went wrong");
  }
});

const getPostIdEf = createEffect(async ({ onClick, searchIdS }) => {
  if (searchIdS === "") {
    Notiflix.Notify.warning("Specify user ID");
    return;
  }
  try {
    const resId = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${searchIdS}`
    );
    const resultId = await resId.data;
    onClick(resultId);
    return resultId;
  } catch (error) {
    Notiflix.Notify.info("Ooops, something went wrong");
  }
});

const postPosts = createEffect(
  async ({ addText, addTextA, openModal, onClick }) => {
    const body = {
      id: v4(),
      title: addText,
      body: addTextA,
    };
    try {
      const resPost = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        body
      );
      const resultPost = resPost.data;
      openModal();
      onClick(resultPost);
      return resultPost;
    } catch (error) {
      Notiflix.Notify.info("Ooops, something went wrong");
    }
  }
);

const changePosts = createEffect(
  async ({ addText, addTextA, openModal, onClick, changePostIdS }) => {
    const body = {
      id: v4(),
      title: addText,
      body: addTextA,
    };
    try {
      const resChange = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${changePostIdS}`,
        body
      );
      const resultChange = resChange.data;
      openModal();
      onClick(resultChange);
      return resultChange;
    } catch (error) {
      Notiflix.Notify.info("Ooops, something went wrong");
    }
  }
);

const deletePost = createEffect(async (id) => {
  try {
    const delPost = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return id;
  } catch (error) {
    Notiflix.Notify.info("Ooops, something went wrong");
  }
});

deletePost.done.watch(({ _, result }) => {
  Notiflix.Notify.success(`Post ${result} delete`);
  return result;
});

export { deletePost, AllPosts, getPostIdEf, postPosts, changePosts };
