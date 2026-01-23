import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useHomepageContent } from "@/hooks/usePublicData";
import { Skeleton } from "@/components/ui/skeleton";

export function HeroSection() {
  const { data: homepage, isLoading } = useHomepageContent();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(195 100% 50% / 0.15) 0%, transparent 70%)`
        }}
      />
      
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(195 100% 50% / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(195 100% 50% / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Partner Digital Terpercaya</span>
          </div>

          {/* Headline */}
          {isLoading ? (
            <Skeleton className="h-20 w-full max-w-3xl mx-auto mb-6" />
          ) : (
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
              {homepage?.headline || (
                <>
                  <span className="gradient-text">Raja Coding</span>
                  <br />
                  <span className="text-foreground">Solusi Digital & Coding</span>
                  <br />
                  <span className="text-muted-foreground">untuk Masa Depan</span>
                </>
              )}
            </h1>
          )}

          {/* Subheadline */}
          {isLoading ? (
            <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-10" />
          ) : (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {homepage?.subheadline || "Kami membantu bisnis Anda berkembang dengan website profesional, aplikasi modern, dan sistem digital yang tepat guna."}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" asChild>
              <Link to={homepage?.cta_primary_link || "/produk"} className="group">
                {homepage?.cta_primary_text || "Lihat Produk"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to={homepage?.cta_secondary_link || "/kontak"}>
                {homepage?.cta_secondary_text || "Hubungi Kami"}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              { value: homepage?.stats_projects || "100+", label: "Proyek Selesai" },
              { value: homepage?.stats_clients || "50+", label: "Klien Puas" },
              { value: homepage?.stats_years || "5+", label: "Tahun Pengalaman" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
