import { useSiteSettings } from "@/hooks/usePublicData";

interface BrandNameProps {
  fallback?: string;
  variant?: "split" | "gradient" | "plain";
  className?: string;
}

/**
 * Renders the company name from site_settings (managed by admin).
 * - "split": first word normal, remaining words in primary color (default).
 * - "gradient": full name with gradient-text class.
 * - "plain": full name as-is.
 */
export function BrandName({ fallback = "Raja Coding", variant = "split", className }: BrandNameProps) {
  const { data: settings } = useSiteSettings();
  const name = (settings?.company_name || fallback).trim();

  if (variant === "gradient") {
    return <span className={`gradient-text ${className || ""}`}>{name}</span>;
  }

  if (variant === "plain") {
    return <span className={className}>{name}</span>;
  }

  const parts = name.split(/\s+/);
  if (parts.length === 1) {
    return <span className={className}>{name}</span>;
  }
  const [first, ...rest] = parts;
  return (
    <span className={className}>
      {first}
      <span className="text-primary">{rest.join(" ")}</span>
    </span>
  );
}

export function useCompanyName(fallback = "Raja Coding") {
  const { data: settings } = useSiteSettings();
  return settings?.company_name?.trim() || fallback;
}
