import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login as loginApi } from "../../service/apiAuth";
import { useUser } from "./useUser";

export const role = [
  {
    role: "madam",
    title: "Exective Director",
  },
  {
    role: "ceo",
    title: "Ceo",
  },
  {
    role: "cert",
    title: "Certificate Admin",
  },
  {
    role: "office",
    title: "Certificate Officer",
  },
];
export function useLogin() {
  const { user } = useUser();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });

      toast.success(`Welcome back 🙂`);
    },
    onError: (err) => {
      // console.log("ERROR", err);
      navigate("/login");
      // toast.error("Check your Network or your user details");
      if (err.code === "ECONNABORTED" || err.message === "Network Error") {
        toast.error("Check your Network Connection");
      } else {
        toast.error("Invalid Credentials");
      }
    },
  });

  return { login, isLoading, isError };
}
