import Axios from "axios";

export const postToBackend = (data, url) => {
 return new Promise((resolve, reject) => {
  Axios.post(url, data).then(response => {
   if (response.status === 200) {
    resolve(200);
   }
  });
 });
};
