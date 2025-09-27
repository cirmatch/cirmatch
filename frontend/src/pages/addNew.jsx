import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addListing } from "@/config/redux/action/productAction";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import ListingForm from "@/components/adminComponents/ListingFrom";
import { useListingForm } from "@/hooks/userListingFrom";
import { listingFormFields } from "@/Constants/listingFromFields";

const AddListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { addListingLoading, addListingError } = useSelector(
    (state) => state.product
  );

  const {
    formData,
    setFormData,
    preview,
    setPreview,
    formError,
    setFormError,
    handleChange,
    validateForm,
    validateImages,
  } = useListingForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields except images
    const required = listingFormFields
      .map((f) => f.name)
      .filter((f) => f !== "images");

    if (!validateForm(required)) return;

    if (Number(formData.quantity) <= 0) {
      setFormError("❗ QUANTITY must be a positive number");
      return;
    }
    if (Number(formData.price) <= 0) {
      setFormError("❗ PRICE must be a positive number");
      return;
    }

    if (!validateImages()) return;

    // Build FormData for API
    const data = new FormData();
    for (let key in formData) {
      const value = formData[key];
      if (value === null || value === undefined) continue;

      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            data.append("images", file);
          }
        });
      } else {
        data.append(key, value);
      }
    }

    dispatch(addListing(data)).then((res) => {
      if (!res.error) router.push("/product");
    });
  };

  return (
    <AdminLayout>
      <ListingForm
        formData={formData}
        setFormData={setFormData}
        preview={preview}
        setPreview={setPreview}
        formError={addListingError || formError}
        loading={addListingLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </AdminLayout>
  );
};

export default AddListing;
