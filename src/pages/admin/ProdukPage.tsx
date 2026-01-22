import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useAdminData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface ProductForm {
  title: string;
  description: string;
  features: string;
  icon: string;
  is_popular: boolean;
  is_active: boolean;
}

const defaultForm: ProductForm = {
  title: "",
  description: "",
  features: "",
  icon: "Package",
  is_popular: false,
  is_active: true,
};

const iconOptions = [
  "Globe", "ShoppingCart", "Calculator", "Database", "Wrench", "GraduationCap", "Package", "Settings", "Smartphone"
];

const ProdukPage = () => {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductForm>(defaultForm);

  const handleOpen = (item?: typeof products extends (infer T)[] ? T : never) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title,
        description: item.description,
        features: Array.isArray(item.features) ? (item.features as string[]).join("\n") : "",
        icon: item.icon || "Package",
        is_popular: item.is_popular,
        is_active: item.is_active,
      });
    } else {
      setEditingId(null);
      setFormData(defaultForm);
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData(defaultForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = formData.features.split("\n").map((f) => f.trim()).filter(Boolean);

    if (editingId) {
      updateProduct.mutate(
        {
          id: editingId,
          title: formData.title,
          description: formData.description,
          features: featuresArray,
          icon: formData.icon,
          is_popular: formData.is_popular,
          is_active: formData.is_active,
        },
        { onSuccess: handleClose }
      );
    } else {
      createProduct.mutate(
        {
          title: formData.title,
          description: formData.description,
          features: featuresArray,
          icon: formData.icon,
          is_popular: formData.is_popular,
        },
        { onSuccess: handleClose }
      );
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      deleteProduct.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Produk & Layanan</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola daftar produk dan layanan yang ditawarkan
          </p>
        </div>
        <Button variant="hero" onClick={() => handleOpen()}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Memuat...</div>
      ) : products?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Belum ada produk. Klik tombol "Tambah Produk" untuk menambahkan.
        </div>
      ) : (
        <div className="grid gap-4">
          {products?.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-card border border-border flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  {item.is_popular && (
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      Populer
                    </span>
                  )}
                  {!item.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      Nonaktif
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                {Array.isArray(item.features) && item.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(item.features as string[]).slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                    {(item.features as string[]).length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{(item.features as string[]).length - 3} lainnya
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpen(item)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Produk" : "Tambah Produk"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Produk</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Website Company Profile"
                required
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Deskripsi</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi produk..."
                required
                rows={3}
                className="bg-secondary/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Fitur (satu per baris)
              </label>
              <Textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Desain modern&#10;SEO friendly&#10;Responsif"
                rows={4}
                className="bg-secondary/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Icon</label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border text-sm"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Tandai sebagai Populer</label>
              <Switch
                checked={formData.is_popular}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_popular: checked }))
                }
              />
            </div>
            {editingId && (
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Status Aktif</label>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, is_active: checked }))
                  }
                />
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Batal
              </Button>
              <Button
                type="submit"
                variant="hero"
                className="flex-1"
                disabled={createProduct.isPending || updateProduct.isPending}
              >
                {createProduct.isPending || updateProduct.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProdukPage;
