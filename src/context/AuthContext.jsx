import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("diginurture_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Mock validation
      if (email === "nimesh@agency.com" && password === "admin123") {
        const user = { email, name: "Nimesh Ranjan", role: "agency" };
        setCurrentUser(user);
        localStorage.setItem("diginurture_user", JSON.stringify(user));
        resolve(user);
      } else if (email === "client@abctech.com" && password === "client123") {
        const user = { email, name: "ABC Tech Founder", role: "client" };
        setCurrentUser(user);
        localStorage.setItem("diginurture_user", JSON.stringify(user));
        resolve(user);
      } else if (email && password) {
        // Fallback for custom entries
        const user = { email, name: email.split("@")[0], role: "client" };
        setCurrentUser(user);
        localStorage.setItem("diginurture_user", JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("diginurture_user");
  };

  const isClient = currentUser?.role === "client";
  const isAgency = currentUser?.role === "agency";

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isClient, isAgency }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
