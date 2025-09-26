import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "@/config/redux/action/orderAction";

export const useOrderDetail = (id) => {
  const dispatch = useDispatch();
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (id) dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  return { order, isLoading, isError, message };
};