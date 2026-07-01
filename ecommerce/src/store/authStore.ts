import { create } from "zustand";

type User = {
  email: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  error?: string;
};

type AuthState = {
  user: User | null;
  signUp: (email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
};

function getStoredUsers(): User[] {
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

export const useAuthStore = create<AuthState>()((set) => {
  const storedUser = localStorage.getItem("user");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    signUp: (email, password) => {
      const users: User[] = getStoredUsers();

      if (users.find((user) => user.email === email)) {
        return { success: false, error: "Email already exists" };
      }

      const newUser = { email, password };
      const nextUsers = [...users, newUser];

      localStorage.setItem("users", JSON.stringify(nextUsers));
      localStorage.setItem("user", JSON.stringify(newUser));
      set({ user: newUser });

      return { success: true };
    },
    login: (email, password) => {
      const users: User[] = getStoredUsers();
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!matchedUser) {
        return { success: false, error: "Invalid email or password" };
      }

      localStorage.setItem("user", JSON.stringify(matchedUser));
      set({ user: matchedUser });

      return { success: true };
    },
    logout: () => {
      localStorage.removeItem("user");
      set({ user: null });
    },
  };
});
