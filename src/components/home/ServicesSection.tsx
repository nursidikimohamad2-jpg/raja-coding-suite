import { Globe, Smartphone, Settings, GraduationCap } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Website profesional, responsif, dan SEO-friendly untuk bisnis dan perusahaan Anda.",
  },
  {
    icon: Smartphone,
    title: "Aplikasi & Sistem",
    description: "Aplikasi mobile dan web-based sesuai kebutuhan operasional bisnis modern.",
  },
  {
    icon: Settings,
    title: "Custom Software",
    description: "Solusi software khusus yang dirancang sesuai proses bisnis unik perusahaan Anda.",
  },
  {
    icon: GraduationCap,
    title: "Edukasi Coding",
    description: "Pelatihan dan kursus programming untuk individu maupun tim perusahaan.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Layanan <span className="gradient-text">Utama</span>
          </h2>
          <p className="text-muted-foreground">
            Kami menyediakan berbagai solusi digital untuk membantu bisnis Anda tumbuh dan berkembang.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
