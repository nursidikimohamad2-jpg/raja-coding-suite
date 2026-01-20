import { Shield, Target, Wallet, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Profesional",
    description: "Tim berpengalaman dengan standar kualitas tinggi",
  },
  {
    icon: Target,
    title: "Solusi Tepat Guna",
    description: "Disesuaikan dengan kebutuhan bisnis Anda",
  },
  {
    icon: Wallet,
    title: "Harga Kompetitif",
    description: "Investasi yang worth it untuk bisnis Anda",
  },
  {
    icon: HeadphonesIcon,
    title: "Support Berkelanjutan",
    description: "Dukungan teknis setelah proyek selesai",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Mengapa <span className="gradient-text">Raja Coding</span>?
          </h2>
          <p className="text-muted-foreground">
            Keunggulan yang membuat kami berbeda dari yang lain.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
