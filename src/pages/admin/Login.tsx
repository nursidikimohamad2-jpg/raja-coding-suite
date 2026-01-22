import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Lock, Mail, AlertCircle, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    if (mode === "login") {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        setError(error.message);
      }
    } else {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Akun berhasil dibuat! Silakan login.");
        setMode("login");
        setFormData({ email: formData.email, password: "", fullName: "" });
      }
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 hero-gradient">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Code2 className="w-7 h-7 text-primary" />
          </div>
          <span className="font-display font-bold text-2xl">
            Raja<span className="text-primary">Coding</span>
          </span>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-2xl card-gradient border border-border">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold mb-2">
              {mode === "login" ? "Admin Login" : "Daftar Admin"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "login"
                ? "Masuk ke dashboard admin Raja Coding"
                : "Buat akun admin baru"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-xs text-green-500">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Nama Lengkap"
                    value={formData.fullName}
                    onChange={handleChange}
                    required={mode === "register"}
                    className="pl-10 bg-secondary/50"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@rajacoding.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 bg-secondary/50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="pl-10 bg-secondary/50"
                />
              </div>
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setSuccess("");
              }}
            >
              {mode === "login"
                ? "Belum punya akun? Daftar"
                : "Sudah punya akun? Masuk"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary transition-colors">
            ← Kembali ke Website
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
