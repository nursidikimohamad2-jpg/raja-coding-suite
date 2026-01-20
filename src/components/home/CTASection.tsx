import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Siap Memulai Proyek
            <br />
            <span className="gradient-text">Digital Anda?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Konsultasikan kebutuhan digital Anda dengan tim kami. Kami siap membantu mewujudkan ide menjadi kenyataan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/kontak" className="group">
                Mulai Konsultasi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/portofolio">Lihat Portofolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
