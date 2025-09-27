"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { editListing, productDetail } from "@/config/redux/action/productAction";
import { listingFormFields } from "@/Constants/listingFromFields";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import { resetEditListingStatus } from "@/config/redux/reducers/productReducer";

const MAX_IMAGES = 5;

const EditListingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { listing, editListingLoading, editListingError, editListingSuccess } = useSelector(
    (state) => state.product
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    plastictype: "",
    metarialtype: "",
    sourcingCondition: "",
    washingProcess: "",
    location: "",
    color: "",
    price: "",
    quantity: "",
  });

  const [quantityValue, setQuantityValue] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("Kg");
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // Fetch listing
  useEffect(() => {
    if (!id) return;
    if (!listing || listing._id !== id) dispatch(productDetail(id));
  }, [dispatch, id, listing]);

  // Load listing into form
  useEffect(() => {
    if (!listing) return;
    setFormData({
      title: listing.title || "",
      description: listing.description || "",
      plastictype: listing.plastictype || "",
      metarialtype: listing.metarialtype || "",
      sourcingCondition: listing.sourcingCondition || "",
      washingProcess: listing.washingProcess || "",
      location: listing.location || "",
      color: listing.color || "",
      price: listing.price || "",
      quantity: listing.quantity || "",
    });
    setOldImages(listing.images || []);

    if (listing.quantity) {
      const match = listing.quantity.match(/^(\d+)\s*(Kg|Mt)$/i);
      if (match) {
        setQuantityValue(match[1]);
        setQuantityUnit(match[2]);
      }
    }
  }, [listing]);

  // Sync quantity
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      quantity: quantityValue && quantityUnit ? `${quantityValue} ${quantityUnit}` : "",
    }));
  }, [quantityValue, quantityUnit]);

  // Toast for success/error
  useEffect(() => {
    if (editListingError) toast.error(editListingError);
    if (editListingSuccess) {
      toast.success("Listing updated successfully!");
      router.push(`/product/${id}`);
      dispatch(resetEditListingStatus())
    }
  }, [editListingError, editListingSuccess, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...newImages];
    const newPreviews = [...preview];

    newFiles[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setNewImages(newFiles);
    setPreview(newPreviews);
  };

  const removeOldImage = (index) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!formData.title) return "Title is required";
    if (!formData.description) return "Description is required";
    if (!formData.plastictype) return "Plastic type is required";
    if (!formData.metarialtype) return "Material type is required";
    if (!formData.location) return "Location is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      return "Price must be positive";
    if (!formData.quantity) return "Quantity is required";
    if (oldImages.length + newImages.length === 0) return "At least 1 image is required";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return toast.error(error);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    newImages.forEach((file) => data.append("images", file));
    data.append("oldImages", JSON.stringify(oldImages));

    dispatch(editListing({ id, data }));
  };

  if (!id) return <p>Loading...</p>;

  return (
    <AdminLayout>
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Toaster />
      <h2 className="text-3xl font-bold mb-8">
        Edit Listing
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Other fields */}
        {listingFormFields
          .filter(({ name }) => !["quantity", "images"].includes(name))
          .map(({ label, name, type, placeholder, options }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
              ) : type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select {label}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type === "number" ? "number" : "text"}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
              )}
            </div>
          ))}

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={quantityValue}
              onChange={(e) => setQuantityValue(e.target.value)}
              placeholder="e.g., 50"
              className="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
            />
            <select
              value={quantityUnit}
              onChange={(e) => setQuantityUnit(e.target.value)}
              className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
            >
              <option value="Kg">Kg</option>
              <option value="Mt">Mt</option>
            </select>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Images (max {MAX_IMAGES})
          </label>
          <div className="flex space-x-4 flex-wrap">
            {oldImages.map((img, idx) => (
              <div key={idx} className="relative w-32 h-32 border rounded-md overflow-hidden">
                <img src={img.path || img} alt={`Old ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeOldImage(idx)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            {newImages.map((img, idx) => (
              <div key={idx} className="relative w-32 h-32 border rounded-md overflow-hidden">
                <img src={preview[idx]} alt={`New ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeNewImage(idx)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            {Array.from({ length: MAX_IMAGES - oldImages.length - newImages.length }).map((_, idx) => {
              const uploadIndex = oldImages.length + newImages.length + idx;
              return (
                <div
                  key={uploadIndex}
                  className="w-32 h-32 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer text-gray-400 hover:border-teal-500"
                  onClick={() => document.getElementById(`imageUpload${uploadIndex}`)?.click()}
                >
                  <span className="text-5xl">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    id={`imageUpload${uploadIndex}`}
                    onChange={(e) => handleImageChange(e, uploadIndex)}
                    className="hidden"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={editListingLoading}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200 disabled:cursor-not-allowed"
        >
          {editListingLoading ? "Updating..." : "Update Listing"}
        </button>
      </form>
    </div>
    </AdminLayout>
  );
};

export default EditListingPage;
