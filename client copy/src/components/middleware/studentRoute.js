import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useContextState } from "../../context/userProvider";

const StudentRoute = ({ children }) => {
  const { user, baseURL, setUser } = useContextState();
  const navigate = useNavigate();

  useEffect(() => {
   
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUser(userInfo); 

      const storedRoleChecked = localStorage.getItem("roleChecked");
      if (!storedRoleChecked) {

        (async () => {
          try {
           
            const response = await fetch(`${baseURL}/api/user/authRole`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${userInfo.token}`,
              },
              body: JSON.stringify(userInfo),
            });

            const result = await response.json();
            if (response.ok && ["student"].includes(result.role)) {
              localStorage.setItem("roleChecked", "true");
            } else {
              throw new Error("Not authorized");
            }
          } catch {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("roleChecked");
            navigate("/"); 
          }
        })();
      }
    } else {
      navigate("/"); 
    }
  }, [baseURL, navigate, setUser]);

  return user ? children : <Navigate to="/" />;
};

export default StudentRoute;
