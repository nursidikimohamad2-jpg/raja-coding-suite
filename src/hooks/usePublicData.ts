import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Site Settings (public)
export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

// Homepage Content (public)
export function useHomepageContent() {
  return useQuery({
    queryKey: ["homepage-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_content")
        .select("*")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

// Active Services (public)
export function useActiveServices() {
  return useQuery({
    queryKey: ["active-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

// About Content (public)
export function useAboutContent() {
  return useQuery({
    queryKey: ["about-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

// Active Portfolio (public)
export function useActivePortfolio() {
  return useQuery({
    queryKey: ["active-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

// Active Products (public)
export function useActiveProducts() {
  return useQuery({
    queryKey: ["active-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

// Active Menu Settings (public)
export function useActiveMenus() {
  return useQuery({
    queryKey: ["active-menus"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_settings")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}
