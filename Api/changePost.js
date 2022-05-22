import { reset } from "../store/effects";
import axios from "axios";
import Notiflix from "notiflix";
import { changePostFx } from "../store/effects";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

changePostFx.use(async ({ e, id, textTitle, textArea, posts }) => {
  e.preventDefault();
  if (textTitle === "") {
    const bodyFind = posts.find((data) => data.id === Number(id));
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
    const titleFind = posts.find((data) => data.id === Number(id));
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
  const changePostId = await result.data;
  reset();
  return changePostId;
});

changePostFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default changePostFx;
