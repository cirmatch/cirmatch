"use client";

import React from "react";

const MAX_IMAGES = 5;

const ImageUploader = ({ oldImages = [], newImages = [], preview = [], handleImageChange, removeOldImage, removeNewImage, error }) => {
  return (
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
              className="w-32 h-32 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer text-gray-400 hover:border-teal-500 mb-2"
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ImageUploader;
