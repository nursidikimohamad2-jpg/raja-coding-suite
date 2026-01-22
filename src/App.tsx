import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import Portofolio from "./pages/Portofolio";
import Tentang from "./pages/Tentang";
import Produk from "./pages/Produk";
import Kontak from "./pages/Kontak";
import Login from "./pages/admin/Login";
import DashboardPage from "./pages/admin/DashboardPage";
import BerandaPage from "./pages/admin/BerandaPage";
import PortofolioPage from "./pages/admin/PortofolioPage";
import TentangPage from "./pages/admin/TentangPage";
import ProdukPage from "./pages/admin/ProdukPage";
import PesanPage from "./pages/admin/PesanPage";
import MediaPage from "./pages/admin/MediaPage";
import PengaturanPage from "./pages/admin/PengaturanPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/portofolio" element={<Portofolio />} />
              <Route path="/tentang" element={<Tentang />} />
              <Route path="/produk" element={<Produk />} />
              <Route path="/kontak" element={<Kontak />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="beranda" element={<BerandaPage />} />
              <Route path="portofolio" element={<PortofolioPage />} />
              <Route path="tentang" element={<TentangPage />} />
              <Route path="produk" element={<ProdukPage />} />
              <Route path="pesan" element={<PesanPage />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="pengaturan" element={<PengaturanPage />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
