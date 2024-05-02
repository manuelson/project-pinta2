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
    const store = getItem("user");
    if (store) {
      return JSON.parse(store);
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
