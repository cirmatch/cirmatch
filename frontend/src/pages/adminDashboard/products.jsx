import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/layout/adminLayout/adminLayout';
import ProductsHeader from '@/components/adminComponents/adminProduct/ProductsHeader';
import ProductsTable from '@/components/adminComponents/adminProduct/ProductTable';

import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllListing, updateListingStatus } from '@/config/redux/action/productAction';
import { toast } from 'react-hot-toast';
import Loading from '@/components/Loading';

export default function AdminProducts() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux product state
  const { listings, isLoading, isError, message } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null); // Track which product status is updating

  useEffect(() => {
    dispatch(getAllListing());
  }, [dispatch]);

const safeListings = Array.isArray(listings) ? listings : [];

// Filter based on search term
let filteredProducts = safeListings.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

// Sort by createdAt (latest first)
filteredProducts = filteredProducts.sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success('Product deleted successfully');
      router.reload();
    } catch (message) {
      toast.error(message || 'Failed to delete product');
    }
  };

  // Navigate to product edit/details page
  const handleRowClick = (id) => {
    router.push(`/product/${id}`);
  };

  // Handle Status Change
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await dispatch(updateListingStatus({ id, status: newStatus })).unwrap();
      toast.success('Status updated successfully!');
    } catch (error) {
      toast.error(error || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) return <AdminLayout><p className="p-6"><Loading /></p></AdminLayout>;
  if (isError) return <AdminLayout><p className="p-6 text-red-600">Error: {message}</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded shadow-md max-w-5xl mx-auto">
        <ProductsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ProductsTable
          products={filteredProducts}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
          onStatusChange={handleStatusChange}
          updatingId={updatingId}
        />
      </div>
    </AdminLayout>
  );
}
