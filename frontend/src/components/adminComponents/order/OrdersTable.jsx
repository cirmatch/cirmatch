import Link from "next/link";
import StatusDropdown from "./StatusDropdown";

export default function OrdersTable({ orders, updatingId, handleStatusChange }) {
  if (!orders.length) return <p>No matching orders found.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-teal-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-white text-teal-700">
          <tr>
            {["Order ID", "User", "Date", "Total", "Status"].map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map(({ _id, name, createdAt, total, status }) => (
            <tr key={_id} className="border-t border-teal-100 hover:bg-teal-50 transition">
              <td className="px-4 py-2 font-mono text-gray-700">
                <Link href={`/adminDashboard/orders/${_id}`} className="hover:underline text-blue-600">#{_id.slice(-5)}</Link>
              </td>
              <td className="px-4 py-2 text-teal-600">
                <Link href={`/adminDashboard/orders/${_id}`} className="hover:underline">{name || "Unknown"}</Link>
              </td>
              <td className="px-4 py-2 text-teal-600">{new Date(createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-teal-600">{total}৳</td>
              <td className="px-4 py-2">
                <StatusDropdown
                  status={status}
                  onChange={(newStatus) => handleStatusChange(_id, newStatus)}
                  disabled={updatingId === _id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
