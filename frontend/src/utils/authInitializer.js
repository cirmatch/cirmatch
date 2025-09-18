import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFromToken } from "@/config/redux/action/authAction";
import { getAccessToken } from "./tokenHelper";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getAccessToken()
      if (token) {
        dispatch(loginFromToken(token));
      }
    }
  }, [dispatch]);

  return null;
}
