import { useState } from "react";
import { Trash2, Mail, Phone, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactMessages, useMarkMessageRead, useDeleteContactMessage } from "@/hooks/useAdminData";
import { formatDistanceToNow, format } from "date-fns";
import { id } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PesanPage = () => {
  const { data: messages, isLoading } = useContactMessages();
  const markRead = useMarkMessageRead();
  const deleteMessage = useDeleteContactMessage();

  const [selectedMessage, setSelectedMessage] = useState<typeof messages extends (infer T)[] ? T : never | null>(null);

  const handleOpen = (msg: typeof messages extends (infer T)[] ? T : never) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      markRead.mutate(msg.id);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus pesan ini?")) {
      deleteMessage.mutate(id);
      setSelectedMessage(null);
    }
  };

  const unreadCount = messages?.filter((m) => !m.is_read).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Pesan Kontak</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pesan dari pengunjung website ({unreadCount} belum dibaca)
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Memuat...</div>
      ) : messages?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Belum ada pesan masuk
        </div>
      ) : (
        <div className="grid gap-4">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpen(msg)}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold truncate">{msg.name}</span>
                    {!msg.is_read && (
                      <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.contact}</p>
                  <p className="text-sm mt-1 line-clamp-2">{msg.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: id })}
                  </p>
                  <div className="flex gap-1 mt-2 justify-end">
                    {msg.is_read ? (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Pesan</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{selectedMessage.contact}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(selectedMessage.created_at), "dd MMMM yyyy, HH:mm", { locale: id })}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  asChild
                >
                  <a
                    href={
                      selectedMessage.contact.includes("@")
                        ? `mailto:${selectedMessage.contact}`
                        : `https://wa.me/${selectedMessage.contact.replace(/\D/g, "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Balas
                  </a>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PesanPage;
