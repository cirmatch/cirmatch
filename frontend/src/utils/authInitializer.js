import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginFromToken } from "@/config/redux/action/authAction";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginFromToken()); // no token needed
  }, [dispatch]);

  return null;
}
