import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X, Check, ExternalLink } from "lucide-react";
import { usePortfolio, useCreatePortfolio, useUpdatePortfolio, useDeletePortfolio } from "@/hooks/useAdminData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface PortfolioForm {
  title: string;
  category: string;
  description: string;
  tags: string;
  image_url: string;
  project_url: string;
  is_active: boolean;
}

const defaultForm: PortfolioForm = {
  title: "",
  category: "",
  description: "",
  tags: "",
  image_url: "",
  project_url: "",
  is_active: true,
};

const PortofolioPage = () => {
  const { data: portfolio, isLoading } = usePortfolio();
  const createPortfolio = useCreatePortfolio();
  const updatePortfolio = useUpdatePortfolio();
  const deletePortfolio = useDeletePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PortfolioForm>(defaultForm);

  const handleOpen = (item?: typeof portfolio extends (infer T)[] ? T : never) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        tags: Array.isArray(item.tags) ? (item.tags as string[]).join(", ") : "",
        image_url: item.image_url || "",
        project_url: item.project_url || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(",").map((t) => t.trim()).filter(Boolean);
    
    if (editingId) {
      updatePortfolio.mutate(
        {
          id: editingId,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tags: tagsArray,
          image_url: formData.image_url || null,
          project_url: formData.project_url || null,
          is_active: formData.is_active,
        },
        { onSuccess: handleClose }
      );
    } else {
      createPortfolio.mutate(
        {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tags: tagsArray,
          image_url: formData.image_url || undefined,
        },
        { onSuccess: handleClose }
      );
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus portfolio ini?")) {
      deletePortfolio.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Portofolio</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola daftar proyek yang telah dikerjakan
          </p>
        </div>
        <Button variant="hero" onClick={() => handleOpen()}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Portfolio
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Memuat...</div>
      ) : portfolio?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Belum ada portfolio. Klik tombol "Tambah Portfolio" untuk menambahkan.
        </div>
      ) : (
        <div className="grid gap-4">
          {portfolio?.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-card border border-border flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  {!item.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      Nonaktif
                    </span>
                  )}
                </div>
                <p className="text-sm text-primary mb-1">{item.category}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                {Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(item.tags as string[]).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.project_url && (
                  <a
                    href={item.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}
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
              {editingId ? "Edit Portfolio" : "Tambah Portfolio"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Judul Proyek</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="E-Commerce Fashion Store"
                required
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori</label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Website Development"
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
                placeholder="Deskripsi singkat proyek..."
                required
                rows={3}
                className="bg-secondary/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (pisahkan dengan koma)
              </label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, Node.js, PostgreSQL"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Gambar (opsional)</label>
              <Input
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://..."
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Proyek (opsional)</label>
              <Input
                name="project_url"
                value={formData.project_url}
                onChange={handleChange}
                placeholder="https://..."
                className="bg-secondary/50"
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
                disabled={createPortfolio.isPending || updatePortfolio.isPending}
              >
                {createPortfolio.isPending || updatePortfolio.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortofolioPage;
