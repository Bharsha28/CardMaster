export function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function normalizeRole(role) {
  const normalized = String(role || "").toUpperCase();
  if (normalized === "OPERATIONS_ANALYST") {
    return "OPERATIONS_ANALYST";
  }
  return normalized;
}
