import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Index from "./pages/Index";
import Portofolio from "./pages/Portofolio";
import Tentang from "./pages/Tentang";
import Produk from "./pages/Produk";
import Kontak from "./pages/Kontak";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/*" element={<Dashboard />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
