import { createContext, useContext, useEffect, useMemo, useState } from "react";
import authService from "../modules/iam/services/authService";
import { decodeJwtPayload, normalizeRole } from "../shared/utils/jwt";

const AuthContext = createContext(null);

const TOKEN_KEY = "cardmaster_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => decodeStoredUser(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
    setUser(decodeStoredUser(token));
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      login: async (credentials) => {
        const responseToken = await authService.login(credentials);
        setToken(responseToken);
        return decodeStoredUser(responseToken);
      },
      logout: async () => {
        try {
          if (token) {
            await authService.logout(token);
          }
        } finally {
          setToken(null);
        }
      },
      hasRole: (roles = []) => roles.includes(user?.role),
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function decodeStoredUser(rawToken) {
  if (!rawToken) {
    return null;
  }

  const token = rawToken.replace(/^Bearer\s+/i, "");
  const payload = decodeJwtPayload(token);
  if (!payload) {
    return null;
  }

  return {
    id: payload.userId,
    name: payload.sub,
    email: payload.email,
    role: normalizeRole(payload.role),
    customerId: payload.customerId,
    exp: payload.exp,
  };
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
