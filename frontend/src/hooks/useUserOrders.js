import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "@/config/redux/action/orderAction";

export const useUserOrders = () => {
  const dispatch = useDispatch();
  const { userOrder, isLoading, isError, message } = useSelector((state) => state.order || {});

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return { userOrder, isLoading, isError, message };
};
