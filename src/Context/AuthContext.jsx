import { createContext } from "react";
import { useState } from "react";
import { useLocalStorage } from "src/hooks/useLocalStorage";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

const Provider = ({children}) => {
  const { getItem } = useLocalStorage();
  const [user, setUser] = useState(() => {
    const storedUser = getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  })

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthProvider = {Provider, Consumer: AuthContext.Consumer};

export default AuthProvider;
