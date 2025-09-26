// pages/addNew.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import UserLayout from "@/layout/clienLayout/UserLayout";
import ListingForm from "@/components/adminComponents/ListingFrom";
import { addNewListing } from "@/config/redux/action/productAction";
import { resetAddListingStatus } from "@/config/redux/reducers/productReducer";
import { listingValidationSchema } from "@/Constants/listingFromFields";

/**
 * NewListing Component
 * 
 * Page for admins to create a new product listing.
 * Includes validation, image handling, and submission to Redux.
 * Redirects unauthenticated users to login and successful submissions to /product.
 */
const NewListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const { loggedIn } = useSelector((state) => state.auth);
  const { addListingLoading, addListingError, addListingSuccess } = useSelector(
    (state) => state.product
  );

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loggedIn) router.push("/auth");
  }, [loggedIn, router]);

  // On successful listing creation, redirect to product page and reset status
  useEffect(() => {
    if (addListingSuccess) {
      router.push("/product");
      dispatch(resetAddListingStatus());
    }
  }, [addListingSuccess, dispatch, router]);

  // React Hook Form setup with Yup validation
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(listingValidationSchema),
    defaultValues: {
      sourcingCondition: "",
      washingProcess: "",
      images: [],
      quantity: "",
    },
  });

  // Watch form data for live updates
  const formData = watch();

  /**
   * Handle form submission
   * - Filters only valid File objects from images
   * - Creates FormData payload for API
   * - Dispatches Redux action to add listing
   */
  const onSubmit = (data) => {
    const files = (data.images || []).filter(file => file instanceof File);

    if (files.length === 0) {
      alert("At least 1 image is required");
      return;
    }

    const formPayload = new FormData();
    files.forEach(file => formPayload.append("images", file));

    Object.keys(data).forEach(key => {
      if (key !== "images") formPayload.append(key, data[key]);
    });

    dispatch(addNewListing(formPayload));
  };

  return (
    <UserLayout>
      <ListingForm
        formData={formData}
        setFormData={(field, value) => setValue(field, value)}
        preview={(formData.images || []).map(file =>
          file instanceof File ? URL.createObjectURL(file) : file
        )}
        setPreview={() => {}} // No-op: placeholder if needed for future
        formError={addListingError}
        loading={addListingLoading}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </UserLayout>
  );
};

export default NewListing;
