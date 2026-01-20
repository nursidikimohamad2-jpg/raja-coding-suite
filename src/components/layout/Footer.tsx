import { Link } from "react-router-dom";
import { Code2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">
                Raja<span className="text-primary">Coding</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Solusi digital terpercaya untuk website, aplikasi, dan sistem informasi custom sesuai kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {["Beranda", "Portofolio", "Tentang", "Produk Kami", "Kontak"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item === "Beranda" ? "" : item.toLowerCase().replace(" ", "-").replace("produk-kami", "produk")}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Website Development</li>
              <li>Aplikasi & Sistem</li>
              <li>Custom Software</li>
              <li>Edukasi Coding</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@rajacoding.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Raja Coding. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
