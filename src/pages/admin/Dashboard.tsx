import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Code2, 
  LayoutDashboard, 
  Home, 
  Briefcase, 
  Info, 
  Package, 
  Mail, 
  Settings, 
  LogOut,
  Menu,
  X,
  Users,
  FileText,
  MessageSquare,
  ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, title: "Dashboard", path: "/admin" },
  { icon: Home, title: "Beranda", path: "/admin/beranda" },
  { icon: Briefcase, title: "Portofolio", path: "/admin/portofolio" },
  { icon: Info, title: "Tentang", path: "/admin/tentang" },
  { icon: Package, title: "Produk", path: "/admin/produk" },
  { icon: MessageSquare, title: "Pesan Kontak", path: "/admin/pesan" },
  { icon: ImageIcon, title: "Logo & Media", path: "/admin/media" },
  { icon: Settings, title: "Pengaturan", path: "/admin/pengaturan" },
];

const stats = [
  { title: "Total Portofolio", value: "12", icon: Briefcase, color: "text-blue-500" },
  { title: "Produk Aktif", value: "6", icon: Package, color: "text-green-500" },
  { title: "Pesan Masuk", value: "24", icon: Mail, color: "text-yellow-500" },
  { title: "Pengunjung", value: "1.2K", icon: Users, color: "text-purple-500" },
];

const recentMessages = [
  { id: 1, nama: "Budi Santoso", email: "budi@email.com", pesan: "Saya tertarik dengan layanan pembuatan website...", waktu: "2 jam lalu" },
  { id: 2, nama: "Ani Wijaya", email: "ani@email.com", pesan: "Berapa biaya untuk aplikasi kasir?", waktu: "5 jam lalu" },
  { id: 3, nama: "Dedi Kurniawan", email: "dedi@email.com", pesan: "Mau konsultasi untuk sistem inventory...", waktu: "1 hari lalu" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check demo auth
    const isDemo = localStorage.getItem("adminDemo");
    if (!isDemo) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminDemo");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold">
            Raja<span className="text-primary">Coding</span>
          </span>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-display font-semibold text-lg">Dashboard Admin</h1>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="p-5 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{stat.title}</span>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Messages */}
          <div className="rounded-xl bg-card border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-semibold">Pesan Terbaru</h2>
              <Link to="/admin/pesan" className="text-sm text-primary hover:underline">
                Lihat Semua
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{msg.nama}</span>
                    <span className="text-xs text-muted-foreground">{msg.waktu}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.email}</p>
                  <p className="text-sm mt-1 line-clamp-1">{msg.pesan}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Briefcase, title: "Tambah Portofolio", path: "/admin/portofolio" },
              { icon: Package, title: "Kelola Produk", path: "/admin/produk" },
              { icon: FileText, title: "Edit Konten Beranda", path: "/admin/beranda" },
            ].map((action) => (
              <Link
                key={action.title}
                to={action.path}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{action.title}</span>
              </Link>
            ))}
          </div>

          {/* Notice */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm">
              <span className="font-semibold text-primary">Info:</span> Ini adalah mode demo. 
              Untuk mengaktifkan fitur CRUD lengkap dengan database, aktifkan Lovable Cloud 
              untuk mendapatkan autentikasi dan penyimpanan data yang aman.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
