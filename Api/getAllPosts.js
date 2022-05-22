import { AllPostsFx } from "../store/effects";
import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

AllPostsFx.use(async () => {
  const result = await axios.get();
  const arrAllPosts = await result.data;
  return arrAllPosts;
});

AllPostsFx.failData.watch((error) => {
  console.log(error.message);
  Notiflix.Notify.failure("Ooops, something went wrong");
});

export default AllPostsFx;
