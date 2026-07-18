import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Index from "./pages/Index";

// Public pages: keep Index eager (LCP), lazy-load the rest
const Portofolio = lazy(() => import("./pages/Portofolio"));
const Tentang = lazy(() => import("./pages/Tentang"));
const Produk = lazy(() => import("./pages/Produk"));
const Kontak = lazy(() => import("./pages/Kontak"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin bundle: fully code-split — public visitors never download it
const AdminLayout = lazy(() =>
  import("./components/admin/AdminLayout").then((m) => ({ default: m.AdminLayout }))
);
const Login = lazy(() => import("./pages/admin/Login"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const BerandaPage = lazy(() => import("./pages/admin/BerandaPage"));
const PortofolioPage = lazy(() => import("./pages/admin/PortofolioPage"));
const TentangPage = lazy(() => import("./pages/admin/TentangPage"));
const ProdukPage = lazy(() => import("./pages/admin/ProdukPage"));
const PesanPage = lazy(() => import("./pages/admin/PesanPage"));
const MediaPage = lazy(() => import("./pages/admin/MediaPage"));
const PengaturanPage = lazy(() => import("./pages/admin/PengaturanPage"));

// Global React Query config — the single biggest perf win here.
// Content changes rarely from admin edits, so we cache aggressively
// and disable window-focus / mount refetches to eliminate duplicate requests.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,       // 5 min — treat data as fresh
      gcTime: 30 * 60 * 1000,         // 30 min — keep cache across navigations
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground text-sm">Memuat...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<RouteFallback />}>
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
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
