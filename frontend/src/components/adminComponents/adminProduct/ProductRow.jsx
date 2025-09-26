import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function ProductRow({ product, onDelete, onRowClick, onStatusChange, updatingId }) {
  const { _id, title, images, Status } = product;

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => onRowClick(_id)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onRowClick(_id);
      }}
    >
      {/* Product Image */}
      <td className="border border-gray-300 px-4 py-2">
        <Image
          src={images[0].path}
          alt={title}
          width={40}
          height={40}
          className="object-cover rounded"
        />
      </td>

      {/* Product Title */}
      <td className="border border-gray-300 px-4 py-2">{title}</td>

      {/* Actions */}
      <td
        className="border border-gray-300 px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => onDelete(_id)}
            className="text-red-500 hover:text-red-700"
            aria-label={`Delete ${title}`}
          >
            <FiTrash2 size={20} />
          </button>
          <Link href={`/adminDashboard/edit/${_id}`} aria-label={`Edit ${title}`}>
            <FiEdit
              size={20}
              className="text-teal-600 hover:text-teal-800 cursor-pointer"
            />
          </Link>
        </div>
      </td>

      {/* Status Dropdown */}
      <td
        className="border border-gray-300 px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <select
          value={Status} // Use product's Status value
          onChange={(e) => onStatusChange(_id, e.target.value)}
          disabled={updatingId === _id}
          className={`px-2 py-1 rounded-md text-sm font-medium text-teal-700 bg-teal-100 border-none focus:outline-none ${
            updatingId === _id ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {["pending", "confirmed", "cancelled","out_of_stock"].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
