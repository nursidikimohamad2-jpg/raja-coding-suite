import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Lock, Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Demo login - in production this would use Supabase Auth
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes only - real authentication requires Lovable Cloud
    if (formData.email === "admin@rajacoding.com" && formData.password === "admin123") {
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di Dashboard Admin",
      });
      // Store demo session
      localStorage.setItem("adminDemo", "true");
      navigate("/admin");
    } else {
      setError("Email atau password salah. Gunakan: admin@rajacoding.com / admin123");
    }

    setIsLoading(false);
  };

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
            <h1 className="font-display text-2xl font-bold mb-2">Admin Login</h1>
            <p className="text-muted-foreground text-sm">
              Masuk ke dashboard admin Raja Coding
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-primary">Demo Mode:</span> Gunakan email{" "}
              <code className="text-primary">admin@rajacoding.com</code> dan password{" "}
              <code className="text-primary">admin123</code>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="pl-10 bg-secondary/50"
                />
              </div>
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? "Masuk..." : "Masuk"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary transition-colors">
            ← Kembali ke Website
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
