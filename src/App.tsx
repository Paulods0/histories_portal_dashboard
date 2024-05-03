import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import NovoPost from "./pages/NovoPost"
import GoogleAds from "./pages/GoogleAds"
import HomeDashboard from "./pages/HomeDashboard"
import Posts from "./pages/Posts"
import LojaAdmin from "./pages/LojaAdmin"
import CategoriesPage from "./pages/categories-page"
import AdicionarGestor from "./pages/AdicionarGestor"
import EditPost from "./pages/EditPost"
import LoginPage from "./pages/LoginPage"
import Profile from "./pages/Profile"
import EditProfileData from "./pages/EditProfileData"
import EditSecurityData from "./pages/EditSecurityData"
import UserPosts from "./pages/UserPosts"
import ForgotPassword from "./pages/ForgotPassword"
import PostDetails from "./pages/PostDetails"

function App() {
  return (
    <main className="font-Poppins">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Dashboard />}>
          <Route index element={<HomeDashboard />} />
          <Route path="novopost" element={<NovoPost />} />
          <Route path="posts" element={<Posts />} />

          <Route path="loja" element={<LojaAdmin />} />
          <Route path="ads" element={<GoogleAds />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="gestor" element={<AdicionarGestor />} />
          <Route path="edit-post/:id" element={<EditPost />} />
          <Route path="post/:id" element={<PostDetails />} />

          <Route path="profile/:id/" element={<Profile />}>
            <Route index element={<UserPosts />} />
            <Route path="settings/edit_profile" element={<EditProfileData />} />
            <Route path="settings/security" element={<EditSecurityData />} />
          </Route>
        </Route>

        <Route path="/settings/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </main>
  )
}

export default App
