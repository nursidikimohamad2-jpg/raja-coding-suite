import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useHomepageContent, useUpdateHomepageContent, useServices, useUpdateService } from "@/hooks/useAdminData";

const BerandaPage = () => {
  const { data: homepage, isLoading } = useHomepageContent();
  const updateHomepage = useUpdateHomepageContent();
  const { data: services } = useServices();
  const updateService = useUpdateService();

  const [formData, setFormData] = useState({
    headline: "",
    subheadline: "",
    cta_primary_text: "",
    cta_primary_link: "",
    cta_secondary_text: "",
    cta_secondary_link: "",
    stats_projects: "",
    stats_clients: "",
    stats_years: "",
    youtube_url: "",
  });

  const [initialized, setInitialized] = useState(false);

  if (homepage && !initialized) {
    setFormData({
      headline: homepage.headline || "",
      subheadline: homepage.subheadline || "",
      cta_primary_text: homepage.cta_primary_text || "",
      cta_primary_link: homepage.cta_primary_link || "",
      cta_secondary_text: homepage.cta_secondary_text || "",
      cta_secondary_link: homepage.cta_secondary_link || "",
      stats_projects: homepage.stats_projects || "",
      stats_clients: homepage.stats_clients || "",
      stats_years: homepage.stats_years || "",
      youtube_url: (homepage as any).youtube_url || "",
    });
    setInitialized(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepage.mutate(formData);
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Memuat...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Konten Beranda</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit konten hero section dan statistik di halaman beranda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Hero Section</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Headline</label>
            <Input
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="Headline utama"
              className="bg-secondary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subheadline</label>
            <Textarea
              name="subheadline"
              value={formData.subheadline}
              onChange={handleChange}
              placeholder="Deskripsi singkat"
              rows={3}
              className="bg-secondary/50 resize-none"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Tombol CTA</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Teks Tombol Utama</label>
              <Input
                name="cta_primary_text"
                value={formData.cta_primary_text}
                onChange={handleChange}
                placeholder="Lihat Produk"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link Tombol Utama</label>
              <Input
                name="cta_primary_link"
                value={formData.cta_primary_link}
                onChange={handleChange}
                placeholder="/produk"
                className="bg-secondary/50"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Teks Tombol Sekunder</label>
              <Input
                name="cta_secondary_text"
                value={formData.cta_secondary_text}
                onChange={handleChange}
                placeholder="Hubungi Kami"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link Tombol Sekunder</label>
              <Input
                name="cta_secondary_link"
                value={formData.cta_secondary_link}
                onChange={handleChange}
                placeholder="/kontak"
                className="bg-secondary/50"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Statistik</h2>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Proyek Selesai</label>
              <Input
                name="stats_projects"
                value={formData.stats_projects}
                onChange={handleChange}
                placeholder="100+"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Klien Puas</label>
              <Input
                name="stats_clients"
                value={formData.stats_clients}
                onChange={handleChange}
                placeholder="50+"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tahun Pengalaman</label>
              <Input
                name="stats_years"
                value={formData.stats_years}
                onChange={handleChange}
                placeholder="5+"
                className="bg-secondary/50"
              />
            </div>
          </div>
        </div>

        {/* YouTube Video */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Video YouTube</h2>
          <p className="text-sm text-muted-foreground">
            Masukkan URL video YouTube yang akan ditampilkan di halaman beranda
          </p>
          
          <div>
            <label className="block text-sm font-medium mb-2">URL YouTube</label>
            <Input
              name="youtube_url"
              value={formData.youtube_url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=xxxxx atau https://youtu.be/xxxxx"
              className="bg-secondary/50"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </p>
          </div>
        </div>

        <Button type="submit" variant="hero" disabled={updateHomepage.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {updateHomepage.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>

      {/* Services List */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4">
        <h2 className="font-display font-semibold">Layanan</h2>
        <p className="text-sm text-muted-foreground">
          Kelola layanan yang tampil di halaman beranda
        </p>
        
        <div className="space-y-3">
          {services?.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <div>
                <p className="font-medium">{service.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {service.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  updateService.mutate({
                    id: service.id,
                    is_active: !service.is_active,
                  })
                }
              >
                {service.is_active ? "Aktif" : "Nonaktif"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BerandaPage;
