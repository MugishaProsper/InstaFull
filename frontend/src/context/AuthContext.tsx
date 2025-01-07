import React, { createContext, useState, useContext, useEffect } from "react";

// Define a type for user data
interface User {
  id: string;
  name: string;
  email: string;
}

// Define a type for the context state
interface AuthContextState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextState | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Login function
  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Optional: Save user info to localStorage
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authUser");
  };

  // Load user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
