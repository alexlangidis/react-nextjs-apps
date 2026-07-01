import { createContext, useMemo, useState, type ReactNode } from "react";

export type AuthContextValue = {
  user: { email: string; password: string } | null;
  signUp: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ email: string; password: string } | null>(
    () => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    },
  );

  function getStoredUsers() {
    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      return [];
    }

    try {
      const parsedUsers = JSON.parse(storedUsers);
      return Array.isArray(parsedUsers) ? parsedUsers : [];
    } catch {
      return [];
    }
  }

  function signUp(email: string, password: string) {
    const users: Array<{ email: string; password: string }> = getStoredUsers();

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }

    const newUser = {
      email,
      password,
    };
    users.push(newUser);
    setUser(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));

    return { success: true };
  }

  function login(email: string, password: string) {
    const users: Array<{ email: string; password: string }> = getStoredUsers();

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!matchedUser) {
      return { success: false, error: "Invalid email or password" };
    }

    setUser(matchedUser);
    localStorage.setItem("user", JSON.stringify(matchedUser));

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      signUp,
      login,
      logout,
    }),
    [login, signUp, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
