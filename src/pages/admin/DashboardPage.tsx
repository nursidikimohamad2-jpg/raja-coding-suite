import { Link } from "react-router-dom";
import { Briefcase, Package, MessageSquare, Mail, Home, Info, Settings, ImageIcon } from "lucide-react";
import { useAdminStats, useContactMessages } from "@/hooks/useAdminData";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

const DashboardPage = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: messages, isLoading: messagesLoading } = useContactMessages();

  const recentMessages = messages?.slice(0, 5) || [];

  const statCards = [
    { title: "Total Portofolio", value: stats?.portfolioCount || 0, icon: Briefcase, color: "text-blue-500" },
    { title: "Produk Aktif", value: stats?.productsCount || 0, icon: Package, color: "text-green-500" },
    { title: "Pesan Masuk", value: stats?.messagesCount || 0, icon: MessageSquare, color: "text-yellow-500" },
    { title: "Belum Dibaca", value: stats?.unreadCount || 0, icon: Mail, color: "text-red-500" },
  ];

  const quickActions = [
    { icon: Briefcase, title: "Kelola Portofolio", path: "/admin/portofolio" },
    { icon: Package, title: "Kelola Produk", path: "/admin/produk" },
    { icon: Home, title: "Edit Beranda", path: "/admin/beranda" },
    { icon: Info, title: "Edit Tentang", path: "/admin/tentang" },
    { icon: ImageIcon, title: "Logo & Media", path: "/admin/media" },
    { icon: Settings, title: "Pengaturan", path: "/admin/pengaturan" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Selamat datang di panel admin Raja Coding
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="p-5 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.title}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-display font-bold">
              {statsLoading ? "..." : stat.value}
            </p>
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
          {messagesLoading ? (
            <div className="p-4 text-center text-muted-foreground">Memuat...</div>
          ) : recentMessages.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">Belum ada pesan</div>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg.id} className="p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium flex items-center gap-2">
                    {msg.name}
                    {!msg.is_read && (
                      <span className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: id })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.contact}</p>
                <p className="text-sm mt-1 line-clamp-1">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display font-semibold mb-4">Aksi Cepat</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
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
      </div>
    </div>
  );
};

export default DashboardPage;
