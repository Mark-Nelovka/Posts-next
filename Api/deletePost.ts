import { deletePostFx } from "../store";
import axios from "axios";
import Notiflix from "notiflix";
import { IPosts } from "../interfaces/interfaces";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

deletePostFx.use(async (id: number) => {
  if (id > 100) {
    return { id };
  }
  const result = await axios.get(`/${id}`);
  const deletePostId: IPosts = await result.data;
  return deletePostId;
});

deletePostFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default deletePostFx;
