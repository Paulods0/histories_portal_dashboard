import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import NovoPost from "./pages/NovoPost"
import GoogleAds from "./pages/GoogleAds"
import HomeDashboard from "./pages/HomeDashboard"
import Posts from "./pages/Posts"
import LojaAdmin from "./pages/LojaAdmin"
import CategoriasAdmin from "./pages/CategoriasAdmin"
import AdicionarGestor from "./pages/AdicionarGestor"
import PostDetail from "./pages/PostDetail"
import LoginPage from "./pages/LoginPage"
import ProtectedRoutes from "./components/ProtectedRoutes"

function App() {
  return (
    <main className="min-h-screen font-Oswald w-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/" element={<Dashboard />}>
            <Route index element={<HomeDashboard />} />
            <Route path="novopost" element={<NovoPost />} />
            <Route path="posts" element={<Posts />} />
            <Route path="loja" element={<LojaAdmin />} />
            <Route path="ads" element={<GoogleAds />} />
            <Route path="categorias" element={<CategoriasAdmin />} />
            <Route path="adicionargestor" element={<AdicionarGestor />} />
            <Route path="post/:id" element={<PostDetail />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </main>
  )
}

export default App
