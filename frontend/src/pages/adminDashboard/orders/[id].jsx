import React from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import CustomerInfo from "@/components/adminComponents/orderDetail/CustomerInfo";
import OrderInfo from "@/components/adminComponents/orderDetail/OrderInfo";
import OrderItemsTable from "@/components/adminComponents/orderDetail/OrderItemsTable";


export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { order, isLoading, isError, message } = useOrderDetail(id);

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">{message}</p>;
  if (!order) return <p className="text-gray-500">Order not found</p>;

  const totalItems = order.orderItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <CustomerInfo user={order.userId} address={order.address} />
      <OrderInfo order={order} totalItems={totalItems} />
      <OrderItemsTable items={order.orderItems} />
    </div>
  );
}
