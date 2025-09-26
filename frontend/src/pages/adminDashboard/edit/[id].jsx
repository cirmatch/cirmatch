import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetEditListingStatus } from "@/config/redux/reducers/productReducer";
import { editListing, productDetail } from "@/config/redux/action/productAction";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import ListingForm from "@/components/adminComponents/ListingFrom";  
import { useListingForm } from "@/hooks/userListingFrom";             
import { listingFormFields } from "@/Constants/listingFromFields";

const EditListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { listing, editListingLoading, editListingError, editListingSuccess } = useSelector(
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
  } = useListingForm();

  // Load product details when editing
  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
      dispatch(resetEditListingStatus());
    }
  }, [id, dispatch]);

  // Populate form when listing is fetched
  useEffect(() => {
    if (listing && listing._id === id) {
      setFormData({ ...listing, images: [] }); // reset images for new uploads
      setPreview(listing.images?.map((img) => img.path) || []); // show existing images
    }
  }, [listing, id, setFormData, setPreview]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields except images for edit
    const required = listingFormFields.map((f) => f.name).filter((f) => f !== "images");

    if (!validateForm(required)) return;

    // Extra validation for quantity and price positive numbers
    if (Number(formData.quantity) <= 0) {
      setFormError("❗ QUANTITY must be a positive number");
      return;
    }
    if (Number(formData.price) <= 0) {
      setFormError("❗ PRICE must be a positive number");
      return;
    }

    // Validate images (at least one existing or new image)
    const hasOldImages = preview && preview.length > 0;
    const hasNewImages = formData.images && formData.images.length > 0;

    if (!hasOldImages && !hasNewImages) {
      setFormError("❗ Please upload at least one image.");
      return;
    }

    const data = new FormData();

    for (let key in formData) {
      const value = formData[key];
      if (value === null || value === undefined) continue;

      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            data.append("images", file); // append only new files
          }
        });
      } else {
        data.append(key, value);
      }
    }

    dispatch(editListing({ id, data })).then((res) => {
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
        formError={editListingError || formError}
        loading={editListingLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </AdminLayout>
  );
};

export default EditListing;
