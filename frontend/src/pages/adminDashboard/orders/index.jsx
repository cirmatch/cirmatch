import React, { useState } from "react";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import { useDispatch } from "react-redux";
import { deleteOrderByAdmin, updateOrderStatus } from "@/config/redux/action/orderAction";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useOrders } from "@/hooks/useOrders";
import SearchInput from "@/components/adminComponents/order/SearchInput";
import OrdersTable from "@/components/adminComponents/order/OrdersTable";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, search, setSearch, isLoading, isError, message } = useOrders();
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await dispatch(updateOrderStatus({ orderId, status: newStatus }));
      if (res?.payload?.success || res?.type?.includes("fulfilled")) toast.success("Order status updated!");
      else toast.error("Failed to update order status.");
    } catch (err) {
      toast.error("Error updating order!");
    } finally {
      setUpdatingId(null);
    }
  };

const OrderDelete = async (orderId) => {
  try {
    const res = await dispatch(deleteOrderByAdmin( orderId ));
    if (res?.payload?.success || res?.type?.includes("fulfilled")) 
      toast.success("Order deleted successfully!");
    else 
      toast.error("Failed to delete order.");
  } catch (err) {
    toast.error("Error deleting order!");
  }
};

  return (
    <AdminLayout>
      <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}>
        <div className="flex h-full grow flex-col">
          <main className="px-10 flex flex-1 justify-center py-5 w-full">
            <div className="w-full max-w-[960px]">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-2">
                  <p className="text-[32px] font-bold text-teal-700 leading-tight">Orders</p>
                  <p className="text-sm text-gray-500">Manage and track all orders placed by customers.</p>
                </div>
              </div>

              <SearchInput search={search} setSearch={setSearch} />

              {isLoading && !updatingId ? <Loading /> : (
                <OrdersTable orders={orders} updatingId={updatingId} handleStatusChange={handleStatusChange} onDelete={OrderDelete}/>
              )}
            </div>
          </main>
        </div>
      </div>
    </AdminLayout>
  );
}
