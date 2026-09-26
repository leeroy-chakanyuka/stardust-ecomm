import axios from "axios";
import { API_URLS, API_BASE_URL } from "./constant";

export async function fetchCategories() {
  const url = API_BASE_URL + API_URLS.GET_ALL_CATEGORIES;

  try {
    console.log(url);
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
