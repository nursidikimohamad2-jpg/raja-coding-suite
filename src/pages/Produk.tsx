import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  ShoppingCart, 
  Calculator, 
  Database, 
  Wrench, 
  GraduationCap,
  ArrowRight,
  Check
} from "lucide-react";

const products = [
  {
    icon: Globe,
    title: "Website Company Profile",
    description: "Website profesional untuk memperkenalkan bisnis Anda kepada dunia.",
    features: [
      "Desain modern & responsif",
      "SEO friendly",
      "Integrasi sosial media",
      "Form kontak & WhatsApp",
    ],
    popular: false,
  },
  {
    icon: ShoppingCart,
    title: "Website UMKM & Toko Online",
    description: "Solusi e-commerce lengkap untuk UMKM dengan fitur penjualan modern.",
    features: [
      "Katalog produk",
      "Keranjang belanja",
      "Integrasi pembayaran",
      "Manajemen pesanan",
    ],
    popular: true,
  },
  {
    icon: Calculator,
    title: "Aplikasi Kasir / POS",
    description: "Sistem Point of Sale yang memudahkan transaksi dan pencatatan.",
    features: [
      "Transaksi cepat",
      "Laporan penjualan",
      "Manajemen stok",
      "Multi cabang",
    ],
    popular: false,
  },
  {
    icon: Database,
    title: "Sistem Informasi Custom",
    description: "Sistem informasi khusus yang disesuaikan dengan kebutuhan bisnis Anda.",
    features: [
      "Analisis kebutuhan",
      "Desain custom",
      "Integrasi sistem",
      "Pelatihan user",
    ],
    popular: false,
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Layanan pemeliharaan dan dukungan teknis untuk sistem yang sudah ada.",
    features: [
      "Monitoring 24/7",
      "Update keamanan",
      "Backup rutin",
      "Support prioritas",
    ],
    popular: false,
  },
  {
    icon: GraduationCap,
    title: "Edukasi Coding",
    description: "Pelatihan dan kursus programming untuk individu maupun tim.",
    features: [
      "Kurikulum terstruktur",
      "Praktek langsung",
      "Sertifikat",
      "Mentor berpengalaman",
    ],
    popular: false,
  },
];

const Produk = () => {
  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Produk</span> & Layanan
          </h1>
          <p className="text-muted-foreground text-lg">
            Berbagai solusi digital yang kami tawarkan untuk membantu bisnis Anda berkembang.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className="group relative p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Populer
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <product.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold mb-3">{product.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant="heroOutline" className="w-full group/btn" asChild>
                <Link to="/kontak">
                  Pesan Sekarang
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl card-gradient border border-border">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Butuh Solusi Custom?
            </h2>
            <p className="text-muted-foreground mb-6">
              Kami juga menerima proyek custom sesuai kebutuhan spesifik bisnis Anda. 
              Konsultasikan gratis dengan tim kami.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/kontak" className="group">
                Konsultasi Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produk;
