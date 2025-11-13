import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBackendUrl } from "../config/apiConfig";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initial load
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [baseURL, setBaseURL] = useState(getBackendUrl());
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // if (!user) {
    //   navigate('/');
    // }
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        baseURL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useContextState = () => {
  return useContext(UserContext);
};

export default UserProvider;
