import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { listingFormFields } from "@/Constants/listingFromFields";
import FormField from "./FromField";
import QuantityField from "./QuantityField";
import ImageUploader from "./ImageUploader";

const AddListingForm = ({
  formData,
  setFormData,
  preview,
  setPreview,
  formError,
  loading,
  handleSubmit,
  onSuccess,
  register,
  errors = {},
  handleChange,
}) => {
  const [quantityValue, setQuantityValue] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("Kg");

  useEffect(() => {
    if (formError) toast.error(formError);
  }, [formError]);

  useEffect(() => {
    if (!setFormData) return;
    setFormData("quantity", quantityValue ? `${quantityValue} ${quantityUnit}` : "");
  }, [quantityValue, quantityUnit]);

  const handleImageChangeLocal = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newFiles = [...(formData.images || [])];
    const newPreviews = [...(preview || [])];
    newFiles[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setFormData("images", newFiles);
    setPreview(newPreviews);
  };

  const removeImage = (index) => {
    const newFiles = [...(formData.images || [])];
    const newPreviews = [...(preview || [])];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFormData("images", newFiles);
    setPreview(newPreviews);
  };

  const bindField = (name, type = "text") =>
    register ? { ...register(name) } : { name, value: formData[name] || "", type, onChange: handleChange };

const onSubmit = async (e) => {
  e.preventDefault();
  try {
    await handleSubmit(e);
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

  return (
    <div className="flex justify-center items-start mt-10 px-5">
      <form className="space-y-6 w-full max-w-3xl" onSubmit={onSubmit}>
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide  pb-2">
          Create Your Listing
        </h1>
        {listingFormFields
          .filter(
            ({ name }) => !["sourcingCondition", "washingProcess", "images", "quantity"].includes(name)
          )
          .map(({ label, name, type, placeholder }) => (
            <FormField
              key={name}
              label={label}
              type={type}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={(e) => setFormData(name, e.target.value)}
              error={errors[name]?.message}
            />
          ))}
          <p className="text-gray-600">Note : Price should be set as quantity unit</p>
        <QuantityField
          quantityValue={quantityValue}
          setQuantityValue={setQuantityValue}
          quantityUnit={quantityUnit}
          setQuantityUnit={setQuantityUnit}
          error={errors.quantity?.message}
        />

        <div className="flex space-x-6">
          {["sourcingCondition", "washingProcess"].map((name) => {
            const field = listingFormFields.find((f) => f.name === name);
            return (
              <FormField
                key={name}
                label={field.label}
                type="select"
                value={formData[name] || ""}
                onChange={(e) => setFormData(name, e.target.value)}
                options={field.options}
                error={errors[name]?.message}
              />
            );
          })}
        </div>

        <ImageUploader
          oldImages={[]}
          newImages={formData.images || []}
          preview={preview || []}
          handleImageChange={handleImageChangeLocal}
          removeOldImage={() => {}}
          removeNewImage={removeImage}
          error={errors.images?.message}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Listing"}
        </button>
        <br />
      </form>
    </div>
  );
};

export default AddListingForm;
