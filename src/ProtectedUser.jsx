import { useUser } from "./features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedUser({ currentUser, children }) {
  const { user,isAuthenticated } = useUser();
  const navigate = useNavigate();

  console.log(user?.user_metadata.role);

  useEffect(() => {
    if (user?.user_metadata.role !== currentUser) navigate("/dashboard/home");
  }, [user, currentUser, navigate]);

 if(isAuthenticated) return children;
}
