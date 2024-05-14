import { Route, Routes } from "react-router-dom"

import CategoriesPage from "./pages/categories-page"
import LoginPage from "./pages/login-page"
import ManageUserPage from "./pages/manage-user-page"
import UserPostsPage from "./pages/user-posts-page"
import StorePage from "./pages/store-page"
import ProfilePage from "./pages/profile-page"
import PostsPage from "./pages/posts-page"
import PostDetailsPage from "./pages/post-details-page"
import AddPostPage from "./pages/add-post-page"
import HomeDashboardPage from "./pages/home-dashboard-page"
import GoogleAdsPage from "./pages/google-ads-page"
import ForgotPasswordPage from "./pages/forgot-password-page"
import EditSecurityDataPage from "./pages/edit-security-data-page"
import EditProfileDataPage from "./pages/edit-profile-data-page"
import EditPostPostPage from "./pages/edit-post-page"

import ProtectedRoutes from "./components/global/protected-routes"
import SchedulePostsPage from "./pages/schedule-posts-page"
import ClassifiedPostsPage from "./pages/classified-posts-page"

function App() {
  return (
    <main className="flex flex-col gap-3">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="loja" element={<StorePage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route index element={<HomeDashboardPage />} />
          <Route path="ads" element={<GoogleAdsPage />} />
          <Route path="novopost" element={<AddPostPage />} />
          <Route path="usuarios" element={<ManageUserPage />} />
          <Route path="post/:id" element={<PostDetailsPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="edit-post/:id" element={<EditPostPostPage />} />
          <Route path="posts/agenda-ao" element={<SchedulePostsPage />} />
          <Route path="posts/classificados" element={<ClassifiedPostsPage />} />

          <Route path="profile/:id/" element={<ProfilePage />}>
            <Route index element={<UserPostsPage />} />
            <Route
              path="settings/edit_profile"
              element={<EditProfileDataPage />}
            />
            <Route
              path="settings/security"
              element={<EditSecurityDataPage />}
            />
          </Route>
        </Route>

        <Route
          path="/settings/forgotpassword"
          element={<ForgotPasswordPage />}
        />
      </Routes>
    </main>
  )
}

export default App
