import axios from "axios";

var baseURL;

 if (typeof window !== "undefined") {
      // Access window object here
      const hostname = window.location.hostname;
      // Perform actions with the window object
       if (hostname.startsWith("www")) {
    baseURL = "https://www.gohoardings.com/api/";
  } else {
    baseURL = "https://gohoardings.com/api/";
  }
    }

const instance =  axios.create({baseURL:baseURL})
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.withCredentials = true;

export default instance;
