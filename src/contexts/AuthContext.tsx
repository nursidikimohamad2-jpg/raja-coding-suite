import { createContext, useContext, useEffect, useState, useRef, useCallback, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Use a ref to track the latest admin check and cancel stale ones
  const adminCheckIdRef = useRef(0);
  const mountedRef = useRef(true);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });

      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }

      return data === true;
    } catch (err) {
      console.error("Error checking admin role:", err);
      return false;
    }
  }, []);

  /**
   * Core handler: process any session change.
   * Uses a monotonically increasing ID so that if multiple auth events
   * fire in quick succession, only the latest one "wins".
   */
  const handleSession = useCallback(async (newSession: Session | null) => {
    const checkId = ++adminCheckIdRef.current;

    setSession(newSession);
    setUser(newSession?.user ?? null);

    if (newSession?.user) {
      // Don't set loading=false until we know the admin status
      setLoading(true);

      try {
        const adminStatus = await checkAdminRole(newSession.user.id);

        // Only apply if this is still the latest check
        if (mountedRef.current && checkId === adminCheckIdRef.current) {
          setIsAdmin(adminStatus);
          setLoading(false);
        }
      } catch {
        if (mountedRef.current && checkId === adminCheckIdRef.current) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    } else {
      // No user — clear admin and stop loading immediately
      setIsAdmin(false);
      setLoading(false);
    }
  }, [checkAdminRole]);

  useEffect(() => {
    mountedRef.current = true;

    // 1) Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        // We handle every event uniformly through handleSession.
        // The checkId mechanism ensures only the latest result is applied.
        handleSession(newSession);
      }
    );

    // 2) Retrieve the initial session (in case onAuthStateChange hasn't fired yet)
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      // handleSession is idempotent — if onAuthStateChange already
      // fired with the same session, the checkId will simply supersede.
      handleSession(initialSession);
    });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };
  }, [handleSession]);

  const signIn = async (email: string, password: string) => {
    // Set loading immediately so AdminLayout doesn't redirect
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // If error, stop loading (onAuthStateChange won't fire)
    if (error) {
      setLoading(false);
    }
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    // Increment checkId to cancel any pending admin check
    adminCheckIdRef.current++;
    setIsAdmin(false);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
