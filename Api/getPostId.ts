import { getPostIdFx, reset } from "../store";
import axios from "axios";
import Notiflix from "notiflix";
import { IPosts } from "../interfaces/interfaces";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

getPostIdFx.use(async (id) => {
  if (id === "") {
    Notiflix.Notify.info("Specify post ID");
    return;
  }
  const result = await axios.get(`/${id}`);
  const postId: IPosts = await result.data;
  reset();
  return [postId];
});

getPostIdFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default getPostIdFx;
