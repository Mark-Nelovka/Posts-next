import { reset } from "../store/effects";
import axios from "axios";
import Notiflix from "notiflix";
import { changePostFx } from "../store/effects";
import { IChangePost, IPosts } from "../interfaces/interfaces";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

changePostFx.use(async ({ e, id, textTitle, textArea, posts }: IChangePost) => {
  e.preventDefault();
  if (textTitle === "") {
    const bodyFind = posts.find((data) => data.id == id);
    const bodyArea = {
      body: textArea,
      title: bodyFind.title,
    };
    const result = await axios.patch(`/${id}`, bodyArea);
    const changeTextA = await result.data;
    reset();
    return changeTextA;
  }
  if (textArea === "") {
    const titleFind = posts.find((data) => data.id == id);
    const bodyTitle = {
      title: textTitle,
      body: titleFind.body,
    };
    const result = await axios.patch(`/${id}`, bodyTitle);
    const changeTitle = await result.data;
    reset();
    return changeTitle;
  }
  const body = {
    title: textTitle,
    body: textArea,
  };
  const result = await axios.put(`/${id}`, body);
  const changePostId: IPosts = await result.data;
  reset();
  return changePostId;
});

changePostFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default changePostFx;
