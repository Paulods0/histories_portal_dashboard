import axios from "axios"
// "https://overland-angola.onrender.com/api/v1"
// baseURL: "http://localhost:8080/api/v1",
const instance = axios.create({
  baseURL: "https://overland-angola.onrender.com/api/v1",
  headers: { "Content-Type": "application/json" },
})

export default instance
