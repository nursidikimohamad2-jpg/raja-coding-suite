import { Link } from "react-router-dom";
import { Code2, Mail, Phone, MapPin } from "lucide-react";
import { useSiteSettings, useActiveServices, useActiveMenus } from "@/hooks/usePublicData";

export function Footer() {
  const { data: settings } = useSiteSettings();
  const { data: services } = useActiveServices();
  const { data: menus } = useActiveMenus();

  const companyName = settings?.company_name || "Raja Coding";
  const tagline = settings?.tagline || "Solusi digital terpercaya untuk website, aplikasi, dan sistem informasi custom sesuai kebutuhan bisnis Anda.";

  // Use database menus if available
  const menuLinks = menus && menus.length > 0 
    ? menus.map((m) => ({ name: m.menu_label, href: m.menu_path }))
    : [
        { name: "Beranda", href: "/" },
        { name: "Portofolio", href: "/portofolio" },
        { name: "Tentang", href: "/tentang" },
        { name: "Produk Kami", href: "/produk" },
        { name: "Kontak", href: "/kontak" },
      ];

  // Use database services if available
  const serviceList = services && services.length > 0 
    ? services.slice(0, 4).map((s) => s.title)
    : ["Website Development", "Aplikasi & Sistem", "Custom Software", "Edukasi Coding"];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt={companyName} 
                  className="w-10 h-10 rounded-xl object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
              )}
              <span className="font-display font-bold text-xl">
                {companyName.includes("Raja") && companyName.includes("Coding") ? (
                  <>
                    Raja<span className="text-primary">Coding</span>
                  </>
                ) : (
                  companyName
                )}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {menuLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {serviceList.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>{settings?.email || "info@rajacoding.com"}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>{settings?.phone || "+62 812-3456-7890"}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>{settings?.address || "Jakarta, Indonesia"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {companyName}. Semua hak dilindungi.
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
