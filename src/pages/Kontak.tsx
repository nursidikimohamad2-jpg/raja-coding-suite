import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Kontak = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nama: "",
    kontak: "",
    pesan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih, kami akan segera menghubungi Anda.",
    });

    setFormData({ nama: "", kontak: "", pesan: "" });
    setIsSubmitting(false);
  };

  const whatsappNumber = "6281234567890";
  const whatsappMessage = encodeURIComponent("Halo Raja Coding, saya ingin konsultasi tentang...");

  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Hubungi <span className="gradient-text">Kami</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Punya pertanyaan atau ingin konsultasi? Kami siap membantu Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="p-8 rounded-2xl card-gradient border border-border">
            <h2 className="font-display text-2xl font-bold mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <Input
                  id="nama"
                  name="nama"
                  placeholder="Masukkan nama Anda"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <label htmlFor="kontak" className="block text-sm font-medium mb-2">
                  Email / WhatsApp
                </label>
                <Input
                  id="kontak"
                  name="kontak"
                  placeholder="Masukkan email atau nomor WhatsApp"
                  value={formData.kontak}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50"
                />
              </div>
              <div>
                <label htmlFor="pesan" className="block text-sm font-medium mb-2">
                  Pesan
                </label>
                <Textarea
                  id="pesan"
                  name="pesan"
                  placeholder="Ceritakan kebutuhan Anda..."
                  value={formData.pesan}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-secondary/50 resize-none"
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Mengirim..."
                ) : (
                  <>
                    Kirim Pesan
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "info@rajacoding.com",
                  href: "mailto:info@rajacoding.com",
                },
                {
                  icon: Phone,
                  title: "Telepon / WhatsApp",
                  value: "+62 812-3456-7890",
                  href: `https://wa.me/${whatsappNumber}`,
                },
                {
                  icon: MapPin,
                  title: "Alamat",
                  value: "Jakarta, Indonesia",
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-display text-lg font-semibold">Chat WhatsApp</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Respon lebih cepat via WhatsApp. Langsung chat dengan tim kami!
              </p>
              <Button
                variant="outline"
                className="w-full border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400"
                asChild
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat WhatsApp Sekarang
                  <MessageCircle className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
