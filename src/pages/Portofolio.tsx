import { ExternalLink, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "E-Commerce Fashion Store",
    category: "Website Development",
    description: "Website toko online fashion dengan sistem keranjang belanja, pembayaran, dan manajemen produk.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 2,
    title: "Aplikasi Kasir Restoran",
    category: "Aplikasi POS",
    description: "Sistem Point of Sale lengkap untuk restoran dengan fitur manajemen meja dan dapur.",
    tags: ["React Native", "Firebase"],
  },
  {
    id: 3,
    title: "Sistem Inventory Gudang",
    category: "Sistem Informasi",
    description: "Sistem manajemen stok dan inventory untuk perusahaan distribusi skala menengah.",
    tags: ["Laravel", "MySQL", "Vue.js"],
  },
  {
    id: 4,
    title: "Company Profile Konstruksi",
    category: "Website Development",
    description: "Website profil perusahaan konstruksi dengan galeri proyek dan form penawaran.",
    tags: ["Next.js", "Tailwind CSS"],
  },
  {
    id: 5,
    title: "Aplikasi Absensi Karyawan",
    category: "Mobile App",
    description: "Aplikasi mobile untuk absensi dengan GPS tracking dan laporan kehadiran.",
    tags: ["Flutter", "Supabase"],
  },
  {
    id: 6,
    title: "Dashboard Analitik UMKM",
    category: "Custom Software",
    description: "Dashboard analitik penjualan dan keuangan untuk pelaku UMKM.",
    tags: ["React", "Chart.js", "Node.js"],
  },
];

const Portofolio = () => {
  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Portofolio</span> Kami
          </h1>
          <p className="text-muted-foreground text-lg">
            Beberapa proyek yang telah kami kerjakan dengan sukses bersama klien-klien kami.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Folder className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">{project.category}</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <Button variant="ghost" size="sm" className="group/btn p-0 h-auto text-primary">
                Lihat Detail
                <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portofolio;
