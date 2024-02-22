import axios from "axios";

/**
 * fetch first entry data
 * refered the url from https://asameshicode.com/javascript-axios/
 * @returns first entry or null
 */
export const fetchFirstData = async () => {
  const result = await axios.get("https://jsonplaceholder.typicode.com/posts");

  if (result != null) {
    return result.data[0];
  } else {
    return null;
  }
};
