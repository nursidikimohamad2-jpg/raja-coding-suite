import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, GripVertical } from "lucide-react";
import { useSiteSettings, useUpdateSiteSettings, useMenuSettings, useUpdateMenuSetting } from "@/hooks/useAdminData";
import { Switch } from "@/components/ui/switch";

const PengaturanPage = () => {
  const { data: settings, isLoading: settingsLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const { data: menus, isLoading: menusLoading } = useMenuSettings();
  const updateMenu = useUpdateMenuSetting();

  const [contactForm, setContactForm] = useState({
    company_name: "",
    tagline: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
  });
  const [initialized, setInitialized] = useState(false);

  if (settings && !initialized) {
    setContactForm({
      company_name: settings.company_name || "",
      tagline: settings.tagline || "",
      email: settings.email || "",
      phone: settings.phone || "",
      whatsapp: settings.whatsapp || "",
      address: settings.address || "",
    });
    setInitialized(true);
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(contactForm);
  };

  const handleMenuToggle = (id: string, is_active: boolean) => {
    updateMenu.mutate({ id, is_active });
  };

  if (settingsLoading || menusLoading) {
    return <div className="text-muted-foreground">Memuat...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Pengaturan umum website
        </p>
      </div>

      {/* Contact Info */}
      <form onSubmit={handleContactSubmit} className="space-y-4">
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Informasi Perusahaan</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Perusahaan</label>
              <Input
                name="company_name"
                value={contactForm.company_name}
                onChange={handleContactChange}
                placeholder="Raja Coding"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <Input
                name="tagline"
                value={contactForm.tagline}
                onChange={handleContactChange}
                placeholder="Solusi Digital & Coding"
                className="bg-secondary/50"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Informasi Kontak</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="info@rajacoding.com"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telepon</label>
              <Input
                name="phone"
                value={contactForm.phone}
                onChange={handleContactChange}
                placeholder="+62 812-3456-7890"
                className="bg-secondary/50"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp (tanpa +)</label>
              <Input
                name="whatsapp"
                value={contactForm.whatsapp}
                onChange={handleContactChange}
                placeholder="6281234567890"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alamat</label>
              <Input
                name="address"
                value={contactForm.address}
                onChange={handleContactChange}
                placeholder="Jakarta, Indonesia"
                className="bg-secondary/50"
              />
            </div>
          </div>
        </div>

        <Button type="submit" variant="hero" disabled={updateSettings.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {updateSettings.isPending ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
      </form>

      {/* Menu Settings */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4">
        <h2 className="font-display font-semibold">Pengaturan Menu</h2>
        <p className="text-sm text-muted-foreground">
          Aktifkan atau nonaktifkan menu yang tampil di website
        </p>

        <div className="space-y-3">
          {menus?.map((menu) => (
            <div
              key={menu.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{menu.menu_label}</p>
                  <p className="text-xs text-muted-foreground">{menu.menu_path}</p>
                </div>
              </div>
              <Switch
                checked={menu.is_active}
                onCheckedChange={(checked) => handleMenuToggle(menu.id, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PengaturanPage;
