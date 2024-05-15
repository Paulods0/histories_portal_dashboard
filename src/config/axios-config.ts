import axios from "axios"

//PRODUCTION -> baseURL:"https://overland-angola.onrender.com/api/v1"
// DEVELOPMENT -> baseURL: "http://localhost:8080/api/v1",

export default axios.create({
  baseURL: "https://overland-angola.onrender.com/api/v1",
  headers: { "Content-Type": "application/json" },
})
