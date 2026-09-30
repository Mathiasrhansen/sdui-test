export class ApiError extends Error {
  constructor(status, data) {
    super(data?.error ?? "Noget gik galt");
    this.status = status;
    this.data = data;
  }
}

// X-Requested-With er en del af CSRF-beskyttelsen på serveren.
export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "fetch",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data);
  return data;
}
