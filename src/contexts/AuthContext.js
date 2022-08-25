import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth-token": token } = parseCookies();

    if (token && user) {
      api.post(`users/${user.githubUser}`, user).then((res) => {
        const user = res.data.user;
        setUser(user);
      });
    }
  }, []);

  async function signIn({ email, password }) {
    await api.post("users/authenticate", { email, password }).then((res) => {
      const token = res.data.user.token;
      const user = res.data.user;
      setCookie(undefined, "nextauth-token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setUser(user);
      console.log(user);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
