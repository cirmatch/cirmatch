import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewListing } from "@/config/redux/action/productAction";
import { resetAddListingStatus } from "@/config/redux/reducers/productReducer";
import ListingForm from "@/components/adminComponents/ListingFrom";
import { listingValidationSchema } from "@/Constants/listingFromFields";
import UserLayout from "@/layout/clienLayout/UserLayout";

const NewListing = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loggedIn } = useSelector((state) => state.auth);
  const { addListingLoading, addListingError, addListingSuccess } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!loggedIn) router.push("/auth");
  }, [loggedIn, router]);

  useEffect(() => {
    if (addListingSuccess) {
      router.push("/product");
      dispatch(resetAddListingStatus());
    }
  }, [addListingSuccess, dispatch, router]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(listingValidationSchema),
    defaultValues: {
      sourcingCondition: "",
      washingProcess: "",
      images: [],
      quantity: "",
    },
  });

  const formData = watch();

  const onSubmit = (data) => {
    const files = (data.images || []).filter(file => file instanceof File); // keep only File objects

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
        preview={(formData.images || []).map(file => file instanceof File ? URL.createObjectURL(file) : file)}
        setPreview={() => {}}
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
