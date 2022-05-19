import { createEffect } from "effector";
import axios from "axios";
import Notiflix from "notiflix";
import { v4 } from "uuid";

const AllPosts = createEffect(async (onClick) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const result = await res.data;
  onClick(result);
  return result;
});

const getPostIdEf = createEffect(async ({ onClick, searchIdS }) => {
  if (searchIdS === "") {
    Notiflix.Notify.warning("Specify user ID");
    return;
  }
  const resId = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${searchIdS}`
  );
  const resultId = await resId.data;
  onClick(resultId);
  return resultId;
});

const postPosts = createEffect(
  async ({ addText, addTextA, openModal, onClick }) => {
    const body = {
      id: v4(),
      title: addText,
      body: addTextA,
    };
    const resPost = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      body
    );
    const resultPost = resPost.data;
    openModal();
    onClick(resultPost);
    return resultPost;
  }
);

const changePosts = createEffect(
  async ({ addText, addTextA, openModal, onClick, changePostIdS }) => {
    const body = {
      id: v4(),
      title: addText,
      body: addTextA,
    };
    const resChange = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${changePostIdS}`,
      body
    );
    const resultChange = resChange.data;
    openModal();
    onClick(resultChange);
    return resultChange;
  }
);

const deletePost = createEffect(async (id) => {
  const delPost = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return id;
});

deletePost.done.watch(({ _, result }) => {
  Notiflix.Notify.success(`Post ${result} delete`);
  return result;
});

export { deletePost, AllPosts, getPostIdEf, postPosts, changePosts };
