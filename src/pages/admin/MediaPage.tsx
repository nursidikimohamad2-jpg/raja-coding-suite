import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image, Link2, Save, Trash2 } from "lucide-react";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useAdminData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MediaPage = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const { toast } = useToast();

  const [logoUrl, setLogoUrl] = useState("");
  const [inputMode, setInputMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (settings && !initialized) {
    setLogoUrl(settings.logo_url || "");
    setInitialized(true);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "File harus berupa gambar",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Ukuran file maksimal 2MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      setLogoUrl(publicUrl);
      toast({
        title: "Berhasil",
        description: "Logo berhasil diupload",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Gagal mengupload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    updateSettings.mutate({ logo_url: logoUrl || null });
  };

  const handleRemoveLogo = () => {
    setLogoUrl("");
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Memuat...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Logo & Media</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kelola logo dan media website
        </p>
      </div>

      <div className="p-6 rounded-xl bg-card border border-border space-y-6">
        <h2 className="font-display font-semibold">Logo Website</h2>

        {/* Preview */}
        {logoUrl && (
          <div className="relative inline-block">
            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <img
                src={logoUrl}
                alt="Logo preview"
                className="max-h-20 max-w-[200px] object-contain"
              />
            </div>
            <button
              onClick={handleRemoveLogo}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Input Mode Toggle */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={inputMode === "url" ? "default" : "outline"}
            size="sm"
            onClick={() => setInputMode("url")}
          >
            <Link2 className="w-4 h-4 mr-2" />
            URL
          </Button>
          <Button
            type="button"
            variant={inputMode === "upload" ? "default" : "outline"}
            size="sm"
            onClick={() => setInputMode("upload")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>

        {/* URL Input */}
        {inputMode === "url" && (
          <div>
            <label className="block text-sm font-medium mb-2">URL Logo</label>
            <Input
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="bg-secondary/50"
            />
          </div>
        )}

        {/* File Upload */}
        {inputMode === "upload" && (
          <div>
            <label className="block text-sm font-medium mb-2">Upload Logo</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              {uploading ? (
                <p className="text-muted-foreground">Mengupload...</p>
              ) : (
                <>
                  <Image className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Klik untuk memilih file atau drag & drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maksimal 2MB (PNG, JPG, WebP)
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <Button
          variant="hero"
          onClick={handleSave}
          disabled={updateSettings.isPending}
        >
          <Save className="w-4 h-4 mr-2" />
          {updateSettings.isPending ? "Menyimpan..." : "Simpan Logo"}
        </Button>
      </div>
    </div>
  );
};

export default MediaPage;
