import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if there's a token on initial load
    const checkUser = async () => {
      try {
        const response = await axios.get("/profile");
        setUser(response.data);  // Set the user from the server
      } catch (err) {
        console.log("User is not logged in", err);
        setUser(null);  // No token or invalid token, set user to null
      } finally {
        setReady(true);  // Mark as ready to render components
      }
    };

    // Call checkUser on page load
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
