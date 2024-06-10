import { Route, Routes } from "react-router-dom"

import AddTips from "./add-tips"
import AllTips from "./pages/all-tips"
import TipsPage from "./pages/tips-page"
import LoginPage from "./pages/login-page"
import StorePage from "./pages/store-page"
import PostsPage from "./pages/posts-page"
import ProfilePage from "./pages/profile-page"
import AddPostPage from "./pages/add-post-page"
import EditTipPage from "./pages/edit-tip-page"
import PartnersPage from "./pages/partners-page"
import UserPostsPage from "./pages/user-posts-page"
import EditPostPostPage from "./pages/edit-post-page"
import ManageUserPage from "./pages/manage-user-page"
import SubscribersPage from "./pages/subscribers-page"
import PostDetailsPage from "./pages/post-details-page"
import { useThemeContext } from "@/context/theme-context"
import SchedulePostsPage from "./pages/schedule-posts-page"
import HomeDashboardPage from "./pages/home-dashboard-page"
import ForgotPasswordPage from "./pages/forgot-password-page"
import ClassifiedPostsPage from "./pages/classified-posts-page"
import EditProfileDataPage from "./pages/edit-profile-data-page"
import ProtectedRoutes from "./components/global/protected-routes"
import EditSecurityDataPage from "./pages/edit-security-data-page"
import AddPartnerPage from "./pages/add-partner-page"
import EditPartnerPage from "./pages/edit-partner-page"

function App() {
  const { theme } = useThemeContext()
  return (
    <main
      className={`flex flex-col gap-3 bg-background text-foreground min-h-screen ${theme}`}
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="dicas" element={<TipsPage />} />
          <Route path="loja" element={<StorePage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route index element={<HomeDashboardPage />} />
          <Route path="dicas/todas" element={<AllTips />} />
          <Route path="novopost" element={<AddPostPage />} />
          <Route path="dicas/:id" element={<EditTipPage />} />
          <Route path="parceiros" element={<PartnersPage />} />
          <Route path="usuarios" element={<ManageUserPage />} />
          <Route path="dicas/adicionar" element={<AddTips />} />
          <Route path="post/:id" element={<PostDetailsPage />} />
          <Route path="inscritos" element={<SubscribersPage />} />
          <Route path="parceiros/:id" element={<EditPartnerPage />} />
          <Route path="edit-post/:id" element={<EditPostPostPage />} />
          <Route path="posts/agenda-ao" element={<SchedulePostsPage />} />
          <Route path="parceiros/adicionar" element={<AddPartnerPage />} />
          <Route path="posts/classificados" element={<ClassifiedPostsPage />} />

          <Route path="profile/:id/" element={<ProfilePage />}>
            <Route index element={<UserPostsPage />} />
            <Route
              path="settings/security"
              element={<EditSecurityDataPage />}
            />
            <Route
              path="settings/edit_profile"
              element={<EditProfileDataPage />}
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
