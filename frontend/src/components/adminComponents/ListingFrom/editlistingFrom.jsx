"use client";

import React from "react";
import { listingFormFields } from "@/Constants/listingFromFields";

const MAX_IMAGES = 5;

const EditListingForm = ({
  formData,
  handleChange,
  quantityValue,
  setQuantityValue,
  quantityUnit,
  setQuantityUnit,
  oldImages,
  newImages,
  preview,
  handleImageChange,
  removeOldImage,
  removeNewImage,
  handleSubmit,
  editListingLoading,
}) => {
  return (
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
        <label className="block text-sm font-medium mb-2">Images (max {MAX_IMAGES})</label>
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
  );
};

export default EditListingForm;
