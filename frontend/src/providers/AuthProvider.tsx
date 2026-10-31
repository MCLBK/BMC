"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { AuthContext, AuthUser } from "@/lib/auth";
import { apiFetch, apiPost } from "@/lib/api";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("bmc_token") : null;
    if (stored) {
      setToken(stored);
      apiFetch<AuthUser>("/auth/profile/", { token: stored })
        .then(setUser)
        .catch(() => {
          localStorage.removeItem("bmc_token");
          localStorage.removeItem("bmc_refresh");
          setToken(null);
        });
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const data = await apiPost<{ access: string; refresh: string }>("/auth/login/", { username, password });
    localStorage.setItem("bmc_token", data.access);
    localStorage.setItem("bmc_refresh", data.refresh);
    setToken(data.access);
    const profile = await apiFetch<AuthUser>("/auth/profile/", { token: data.access });
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bmc_token");
    localStorage.removeItem("bmc_refresh");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
