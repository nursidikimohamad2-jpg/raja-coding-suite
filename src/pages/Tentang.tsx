import { Target, Eye, CheckCircle, Users, Award, Zap } from "lucide-react";

const Tentang = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tentang <span className="gradient-text">Raja Coding</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Kami adalah tim developer profesional yang berdedikasi untuk membantu bisnis dan individu 
              mewujudkan ide digital mereka menjadi kenyataan. Dengan pengalaman lebih dari 5 tahun, 
              kami telah membantu puluhan klien mencapai tujuan digital mereka.
            </p>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Visi */}
            <div className="p-8 rounded-2xl card-gradient border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Visi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi partner teknologi terpercaya bagi bisnis di Indonesia, membantu transformasi 
                digital dengan solusi inovatif dan berkualitas tinggi yang mendorong pertumbuhan 
                dan kesuksesan jangka panjang.
              </p>
            </div>

            {/* Misi */}
            <div className="p-8 rounded-2xl card-gradient border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Misi</h2>
              <ul className="space-y-3">
                {[
                  "Memberikan solusi digital berkualitas dengan harga kompetitif",
                  "Mengutamakan kepuasan dan kebutuhan klien",
                  "Terus berinovasi mengikuti perkembangan teknologi",
                  "Membangun hubungan jangka panjang dengan klien",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Nilai-Nilai <span className="gradient-text">Kami</span>
            </h2>
            <p className="text-muted-foreground">
              Prinsip yang menjadi fondasi dalam setiap proyek yang kami kerjakan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Kolaboratif",
                description: "Kami bekerja sama dengan klien sebagai partner, bukan sekadar vendor.",
              },
              {
                icon: Award,
                title: "Berkualitas",
                description: "Setiap baris kode ditulis dengan standar kualitas tinggi.",
              },
              {
                icon: Zap,
                title: "Responsif",
                description: "Cepat tanggap terhadap kebutuhan dan feedback klien.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tentang;
