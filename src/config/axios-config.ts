import axios from "axios"

// baseURL: "https://overland-angola.onrender.com/api/v1",

// const URL_DEV_MODE = "http://localhost:8080/api/v1"

export default axios.create({
  baseURL: import.meta.env.VITE_RENDER_API,
  headers: { "Content-Type": "application/json" },
})
