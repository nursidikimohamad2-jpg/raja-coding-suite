import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Save, Plus, Trash2 } from "lucide-react";
import { useAboutContent, useUpdateAboutContent } from "@/hooks/useAdminData";

const TentangPage = () => {
  const { data: about, isLoading } = useAboutContent();
  const updateAbout = useUpdateAboutContent();

  const [profileText, setProfileText] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (about && !initialized) {
    setProfileText(about.profile_text || "");
    setVision(about.vision || "");
    setMission(Array.isArray(about.mission) ? about.mission as string[] : []);
    setInitialized(true);
  }

  const handleMissionChange = (index: number, value: string) => {
    const newMission = [...mission];
    newMission[index] = value;
    setMission(newMission);
  };

  const addMission = () => {
    setMission([...mission, ""]);
  };

  const removeMission = (index: number) => {
    setMission(mission.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout.mutate({
      profile_text: profileText,
      vision,
      mission: mission.filter(Boolean),
    });
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Memuat...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Konten Tentang</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit profil perusahaan, visi, dan misi
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Profil Perusahaan</h2>
          <Textarea
            value={profileText}
            onChange={(e) => setProfileText(e.target.value)}
            placeholder="Deskripsi tentang perusahaan..."
            rows={5}
            className="bg-secondary/50 resize-none"
          />
        </div>

        {/* Vision */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-display font-semibold">Visi</h2>
          <Textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            placeholder="Visi perusahaan..."
            rows={3}
            className="bg-secondary/50 resize-none"
          />
        </div>

        {/* Mission */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">Misi</h2>
            <Button type="button" variant="ghost" size="sm" onClick={addMission}>
              <Plus className="w-4 h-4 mr-1" />
              Tambah
            </Button>
          </div>
          <div className="space-y-3">
            {mission.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleMissionChange(index, e.target.value)}
                  placeholder={`Misi ${index + 1}`}
                  className="bg-secondary/50"
                />
                <button
                  type="button"
                  onClick={() => removeMission(index)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
            {mission.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Belum ada misi. Klik "Tambah" untuk menambahkan.
              </p>
            )}
          </div>
        </div>

        <Button type="submit" variant="hero" disabled={updateAbout.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {updateAbout.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </div>
  );
};

export default TentangPage;
