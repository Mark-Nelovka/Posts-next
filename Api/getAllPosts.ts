import { AllPostsFx } from "../store";
import axios from "axios";
import Notiflix from "notiflix";
import { IPosts } from "../interfaces/interfaces";

const URL = "https://jsonplaceholder.typicode.com/posts";

AllPostsFx.use(async () => {
  const result = await axios.get(`${URL}`);
  const arrAllPosts: IPosts[] = await result.data;
  return arrAllPosts;
});

AllPostsFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default AllPostsFx;
