"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { listingFormFields } from "@/Constants/listingFromFields";

const MAX_IMAGES = 5;

const ListingForm = ({
  formData,
  setFormData,
  preview,
  setPreview,
  formError,
  loading,
  handleSubmit,
  onSuccess, // new callback for success
  register,
  errors = {},
  handleChange,
}) => {
  const [quantityValue, setQuantityValue] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("Kg");

  // Show toast if formError changes
  useEffect(() => {
    if (formError) toast.error(formError);
  }, [formError]);

  // Initialize quantity for edit mode
  useEffect(() => {
    if (formData?.quantity) {
      const match = formData.quantity.match(/^(\d+)\s*(Kg|Mt)$/i);
      if (match) {
        setQuantityValue(match[1]);
        setQuantityUnit(match[2]);
      }
    }
  }, [formData?.quantity]);

  // Sync quantity with formData
  useEffect(() => {
    if (!setFormData) return;
    setFormData(
      "quantity",
      quantityValue ? `${quantityValue} ${quantityUnit}` : ""
    );
  }, [quantityValue, quantityUnit]);

  const handleImageChange = (e, index) => {
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
    register
      ? { ...register(name) }
      : { name, value: formData[name] || "", type, onChange: handleChange };

  // Wrap handleSubmit to include success toast
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      toast.success(
        formData._id
          ? "Listing updated successfully!"
          : "Listing added successfully!"
      );
      if (onSuccess) onSuccess();
    } catch (err) {
      // Errors handled by formError / react-hook-form
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-7">
      <h2 className="text-3xl font-bold mb-8">
        {formData._id ? "Edit Listing" : "Create a New Listing"}
      </h2>

      <form className="space-y-6" onSubmit={handleFormSubmit}>
        {/* Other fields */}
        {listingFormFields
          .filter(
            ({ name }) =>
              !["sourcingCondition", "washingProcess", "images", "quantity"].includes(name)
          )
          .map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              {type === "textarea" ? (
                <textarea
                  {...bindField(name)}
                  rows={4}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
              ) : (
                <input
                  {...bindField(name, type)}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
              )}
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
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
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity?.message}</p>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex space-x-6">
          {["sourcingCondition", "washingProcess"].map((name) => {
            const field = listingFormFields.find((f) => f.name === name);
            return (
              <div key={name} className="flex-1">
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                <select
                  {...(register
                    ? register(name)
                    : {
                        name,
                        value: formData[name] || "",
                        onChange: (e) => setFormData(name, e.target.value),
                      })}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="" disabled>
                    Select {field.label}
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Images (max {MAX_IMAGES})
          </label>
          <div className="flex space-x-4">
            {[...Array(MAX_IMAGES)].map((_, index) => (
              <div
                key={index}
                className="relative w-32 h-32 border-2 rounded-md flex items-center justify-center cursor-pointer border-dashed border-gray-400 hover:border-teal-500"
                onClick={() =>
                  document.getElementById(`imageUpload${index}`)?.click()
                }
              >
                {preview && preview[index] ? (
                  <>
                    <img
                      src={preview[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <span className="text-5xl text-gray-400 select-none">+</span>
                )}
                <input
                  id={`imageUpload${index}`}
                  type="file"
                  name="images"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images?.message}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200 disabled:cursor-not-allowed"
          >
            {loading
              ? formData._id
                ? "Updating..."
                : "Adding..."
              : formData._id
              ? "Update Listing"
              : "Add Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
