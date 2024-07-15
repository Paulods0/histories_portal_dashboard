import axios from "axios"

// baseURL: "https://overland-angola.onrender.com/api/v1",
// baseURL: "https://overland-angola.onrender.com/api/v1",
const dev_mode_url = "http://localhost:8080/api/v1"
export default axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_RENDER_API
      : dev_mode_url,
  headers: { "Content-Type": "application/json" },
})
