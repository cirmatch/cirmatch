import Link from "next/link";
import StatusDropdown from "./StatusDropdown";
import { FiTrash2 } from "react-icons/fi";

export default function OrdersTable({ orders, updatingId, handleStatusChange,onDelete }) {
  if (!orders.length)
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center bg-gray-50 rounded-lg shadow-md p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0h-4m-4 0H5m14 0a2 2 0 002-2V7a2 2 0 00-2-2h-4l-2-2H9L7 5H3a2 2 0 00-2 2v8a2 2 0 002 2h16z"
        />
      </svg>
      <h2 className="text-gray-700 text-xl font-semibold mb-2">No Orders Found</h2>

    </div>
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-teal-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-white text-teal-700">
          <tr>
            {["Order ID", "User", "Date", "Total", "Status","Action"].map((header) => (
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
              <td className="px-4 py-2">
                <button
                  onClick={() => onDelete(_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
