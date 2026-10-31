const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Erreur serveur" }));
    throw new Error(error.detail || `Erreur ${res.status}`);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

export async function apiPost<T>(endpoint: string, data: unknown, options: FetchOptions = {}): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
}

export async function apiPut<T>(endpoint: string, data: unknown, options: FetchOptions = {}): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    ...options,
  });
}

export async function apiUpload<T>(endpoint: string, formData: FormData, options: FetchOptions = {}): Promise<T> {
  const { token, ...rest } = options;
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Erreur serveur" }));
    throw new Error(error.detail || `Erreur ${res.status}`);
  }

  return res.json();
}
