import { reset, addPostFx } from "../store";
import axios from "axios";
import Notiflix from "notiflix";
import { IAddPost, IPosts } from "../interfaces/interfaces";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

addPostFx.use(async ({ e, textTitle, textArea }: IAddPost) => {
  e.preventDefault();
  const body = {
    title: textTitle,
    body: textArea,
  };

  const add = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    body
  );
  const addRes: IPosts[] = await add.data;
  reset();
  return [addRes];
});

addPostFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default addPostFx;
