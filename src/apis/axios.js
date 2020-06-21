import axios from "axios";
import URL from "./url";

export default axios.create({
  baseURL: URL
});
