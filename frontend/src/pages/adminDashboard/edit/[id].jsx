"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { editListing, productDetail } from "@/config/redux/action/productAction";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import { resetEditListingStatus } from "@/config/redux/reducers/productReducer";
import EditListingForm from "@/components/adminComponents/ListingFrom/editlistingFrom";
import ErrorPage from "@/pages/404";
import Loading from "@/components/Loading";

const EditListingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { listing,isLoading, editListingLoading, editListingError, editListingSuccess } = useSelector(
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
      dispatch(resetEditListingStatus());
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
  if (!listing && !isLoading) {
    return (
      <ErrorPage
        code="404"
        message={`No products Found`}
        buttonText="Go Back To Product Page"
        buttonLink="/product"
      />
    );
  }

    if (isLoading) {
    return (
      <AdminLayout>
        <Loading/>
      </AdminLayout>
    );
  }
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
        <h2 className="text-3xl font-bold mb-8">Edit Listing</h2>
        <EditListingForm
          formData={formData}
          handleChange={handleChange}
          quantityValue={quantityValue}
          setQuantityValue={setQuantityValue}
          quantityUnit={quantityUnit}
          setQuantityUnit={setQuantityUnit}
          oldImages={oldImages}
          newImages={newImages}
          preview={preview}
          handleImageChange={handleImageChange}
          removeOldImage={removeOldImage}
          removeNewImage={removeNewImage}
          handleSubmit={handleSubmit}
          editListingLoading={editListingLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default EditListingPage;
