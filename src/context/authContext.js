import { createContext, useState, useEffect } from "react";
import axiosIns from "../axiosIns";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await axiosIns.get("/dashboard");
          setUser(response.data.userDetails);
        } catch (error) {
          console.error(
            "Error occured while fetching the user details: ",
            error.message
          );
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
