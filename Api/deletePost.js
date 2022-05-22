import { deletePostFx } from "../store/effects";
import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

deletePostFx.use(async (id) => {
  if (id > 100) {
    return { id };
  }
  const result = await axios.get(`/${id}`);
  const deletePostId = await result.data;
  return deletePostId;
});

deletePostFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default deletePostFx;
