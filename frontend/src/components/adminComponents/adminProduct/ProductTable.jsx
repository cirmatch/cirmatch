import React from 'react';
import ProductRow from './ProductRow'; // adjust path if needed

const ProductsTable = ({ products, onDelete, onRowClick ,status, onStatusChange,}) => {
  return (
    <table className="w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-teal-200">
          <th className="border border-gray-300 p-2">Image</th>
          <th className="border border-gray-300 p-2">Title</th>
          <th className="border border-gray-300 p-2">Actions</th>
          <th className="border border-gray-300 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductRow
              key={ product._id} 
              product={product}
              onDelete={onDelete}
              onRowClick={onRowClick}
              status={status}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center py-6 text-gray-500 italic">
              No products found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
