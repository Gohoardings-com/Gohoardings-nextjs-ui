import axios from "axios";

const instance =  axios.create({baseURL:process.env.DataBaseConnection})
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.withCredentials = true;

export default instance;
