-- Indexes for public content lists (filter by is_active + order by sort_order)
CREATE INDEX IF NOT EXISTS idx_services_active_sort ON public.services (is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_active_sort ON public.portfolio (is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_products_active_sort ON public.products (is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_menu_settings_active_sort ON public.menu_settings (is_active, sort_order);

-- Contact messages: recent-first list + fast unread count
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_unread ON public.contact_messages (is_read) WHERE is_read = false;

-- Role lookups (has_role RPC)
CREATE INDEX IF NOT EXISTS idx_user_roles_user_role ON public.user_roles (user_id, role);

-- Consolidated admin stats: single round-trip instead of 4 HEAD count queries
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS TABLE (
  portfolio_count bigint,
  products_count bigint,
  messages_count bigint,
  unread_count bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT count(*) FROM public.portfolio),
    (SELECT count(*) FROM public.products WHERE is_active = true),
    (SELECT count(*) FROM public.contact_messages),
    (SELECT count(*) FROM public.contact_messages WHERE is_read = false)
  WHERE public.has_role(auth.uid(), 'admin');
$$;

GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;