import { reset, addPostFx } from "../store/effects";
import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

addPostFx.use(async ({ e, textTitle, textArea }) => {
  e.preventDefault();
  const body = {
    title: textTitle,
    body: textArea,
  };

  const add = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    body
  );
  const addRes = await add.data;
  reset();
  return [addRes];
});

addPostFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default addPostFx;
