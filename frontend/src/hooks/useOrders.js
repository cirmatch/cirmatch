import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "@/config/redux/action/orderAction";

export const useOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector((state) => state.order);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;
    const lowerSearch = search.toLowerCase();
    return orders.filter(
      ({ _id, name, status }) =>
        _id.includes(search) ||
        (name && name.toLowerCase().includes(lowerSearch)) ||
        (status && status.toLowerCase().includes(lowerSearch))
    );
  }, [search, orders]);

  return { orders: filteredOrders, search, setSearch, isLoading, isError, message };
};
