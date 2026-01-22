-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create site_settings table for general settings
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT,
  company_name TEXT DEFAULT 'Raja Coding',
  tagline TEXT DEFAULT 'Solusi Digital & Coding untuk Masa Depan',
  email TEXT DEFAULT 'info@rajacoding.com',
  phone TEXT DEFAULT '+62 812-3456-7890',
  whatsapp TEXT DEFAULT '6281234567890',
  address TEXT DEFAULT 'Jakarta, Indonesia',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create homepage_content table
CREATE TABLE public.homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL DEFAULT 'Raja Coding – Solusi Digital & Coding untuk Masa Depan',
  subheadline TEXT NOT NULL DEFAULT 'Kami membantu bisnis Anda berkembang dengan website profesional, aplikasi modern, dan sistem digital yang tepat guna.',
  cta_primary_text TEXT DEFAULT 'Lihat Produk',
  cta_primary_link TEXT DEFAULT '/produk',
  cta_secondary_text TEXT DEFAULT 'Hubungi Kami',
  cta_secondary_link TEXT DEFAULT '/kontak',
  stats_projects TEXT DEFAULT '100+',
  stats_clients TEXT DEFAULT '50+',
  stats_years TEXT DEFAULT '5+',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table for homepage services section
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Globe',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about_content table
CREATE TABLE public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_text TEXT NOT NULL DEFAULT 'Kami adalah tim developer profesional yang berdedikasi untuk membantu bisnis dan individu mewujudkan ide digital mereka menjadi kenyataan.',
  vision TEXT NOT NULL DEFAULT 'Menjadi partner teknologi terpercaya bagi bisnis di Indonesia.',
  mission JSONB NOT NULL DEFAULT '["Memberikan solusi digital berkualitas dengan harga kompetitif", "Mengutamakan kepuasan dan kebutuhan klien", "Terus berinovasi mengikuti perkembangan teknologi", "Membangun hubungan jangka panjang dengan klien"]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio table
CREATE TABLE public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT,
  project_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  icon TEXT NOT NULL DEFAULT 'Package',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table for form submissions
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_settings table
CREATE TABLE public.menu_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_name TEXT NOT NULL UNIQUE,
  menu_label TEXT NOT NULL,
  menu_path TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_settings ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles (only admin can manage)
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Public read access for content tables (website visitors)
CREATE POLICY "Public can read site_settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public can read homepage_content" ON public.homepage_content
  FOR SELECT USING (true);

CREATE POLICY "Public can read active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read about_content" ON public.about_content
  FOR SELECT USING (true);

CREATE POLICY "Public can read active portfolio" ON public.portfolio
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active products" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active menus" ON public.menu_settings
  FOR SELECT USING (is_active = true);

-- Admin write access for content tables
CREATE POLICY "Admins can manage site_settings" ON public.site_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage homepage_content" ON public.homepage_content
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage about_content" ON public.about_content
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage portfolio" ON public.portfolio
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage menu_settings" ON public.menu_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Contact messages: public can insert, only admin can read/manage
CREATE POLICY "Public can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact messages" ON public.contact_messages
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage contact messages" ON public.contact_messages
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_homepage_content_updated_at
  BEFORE UPDATE ON public.homepage_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
  BEFORE UPDATE ON public.about_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at
  BEFORE UPDATE ON public.portfolio
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_settings_updated_at
  BEFORE UPDATE ON public.menu_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.site_settings (company_name) VALUES ('Raja Coding');

INSERT INTO public.homepage_content (headline) VALUES ('Raja Coding – Solusi Digital & Coding untuk Masa Depan');

INSERT INTO public.about_content (profile_text) VALUES ('Kami adalah tim developer profesional yang berdedikasi untuk membantu bisnis dan individu mewujudkan ide digital mereka menjadi kenyataan. Dengan pengalaman lebih dari 5 tahun, kami telah membantu puluhan klien mencapai tujuan digital mereka.');

-- Insert default services
INSERT INTO public.services (title, description, icon, sort_order) VALUES
  ('Website Development', 'Website profesional, responsif, dan SEO-friendly untuk bisnis dan perusahaan Anda.', 'Globe', 1),
  ('Aplikasi & Sistem', 'Aplikasi mobile dan web-based sesuai kebutuhan operasional bisnis modern.', 'Smartphone', 2),
  ('Custom Software', 'Solusi software khusus yang dirancang sesuai proses bisnis unik perusahaan Anda.', 'Settings', 3),
  ('Edukasi Coding', 'Pelatihan dan kursus programming untuk individu maupun tim perusahaan.', 'GraduationCap', 4);

-- Insert default products
INSERT INTO public.products (title, description, features, icon, is_popular, sort_order) VALUES
  ('Website Company Profile', 'Website profesional untuk memperkenalkan bisnis Anda kepada dunia.', '["Desain modern & responsif", "SEO friendly", "Integrasi sosial media", "Form kontak & WhatsApp"]'::jsonb, 'Globe', false, 1),
  ('Website UMKM & Toko Online', 'Solusi e-commerce lengkap untuk UMKM dengan fitur penjualan modern.', '["Katalog produk", "Keranjang belanja", "Integrasi pembayaran", "Manajemen pesanan"]'::jsonb, 'ShoppingCart', true, 2),
  ('Aplikasi Kasir / POS', 'Sistem Point of Sale yang memudahkan transaksi dan pencatatan.', '["Transaksi cepat", "Laporan penjualan", "Manajemen stok", "Multi cabang"]'::jsonb, 'Calculator', false, 3),
  ('Sistem Informasi Custom', 'Sistem informasi khusus yang disesuaikan dengan kebutuhan bisnis Anda.', '["Analisis kebutuhan", "Desain custom", "Integrasi sistem", "Pelatihan user"]'::jsonb, 'Database', false, 4),
  ('Maintenance & Support', 'Layanan pemeliharaan dan dukungan teknis untuk sistem yang sudah ada.', '["Monitoring 24/7", "Update keamanan", "Backup rutin", "Support prioritas"]'::jsonb, 'Wrench', false, 5),
  ('Edukasi Coding', 'Pelatihan dan kursus programming untuk individu maupun tim.', '["Kurikulum terstruktur", "Praktek langsung", "Sertifikat", "Mentor berpengalaman"]'::jsonb, 'GraduationCap', false, 6);

-- Insert default menu settings
INSERT INTO public.menu_settings (menu_name, menu_label, menu_path, sort_order) VALUES
  ('beranda', 'Beranda', '/', 1),
  ('portofolio', 'Portofolio', '/portofolio', 2),
  ('tentang', 'Tentang', '/tentang', 3),
  ('produk', 'Produk Kami', '/produk', 4),
  ('kontak', 'Kontak', '/kontak', 5);

-- Insert sample portfolio
INSERT INTO public.portfolio (title, category, description, tags, sort_order) VALUES
  ('E-Commerce Fashion Store', 'Website Development', 'Website toko online fashion dengan sistem keranjang belanja, pembayaran, dan manajemen produk.', '["React", "Node.js", "PostgreSQL"]'::jsonb, 1),
  ('Aplikasi Kasir Restoran', 'Aplikasi POS', 'Sistem Point of Sale lengkap untuk restoran dengan fitur manajemen meja dan dapur.', '["React Native", "Firebase"]'::jsonb, 2),
  ('Sistem Inventory Gudang', 'Sistem Informasi', 'Sistem manajemen stok dan inventory untuk perusahaan distribusi skala menengah.', '["Laravel", "MySQL", "Vue.js"]'::jsonb, 3),
  ('Company Profile Konstruksi', 'Website Development', 'Website profil perusahaan konstruksi dengan galeri proyek dan form penawaran.', '["Next.js", "Tailwind CSS"]'::jsonb, 4),
  ('Aplikasi Absensi Karyawan', 'Mobile App', 'Aplikasi mobile untuk absensi dengan GPS tracking dan laporan kehadiran.', '["Flutter", "Supabase"]'::jsonb, 5),
  ('Dashboard Analitik UMKM', 'Custom Software', 'Dashboard analitik penjualan dan keuangan untuk pelaku UMKM.', '["React", "Chart.js", "Node.js"]'::jsonb, 6);