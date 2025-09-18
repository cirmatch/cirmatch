import React from "react";

const ImageUploader = ({ images, setImages, previews, setPreviews, maxImages = 5, error }) => {
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newFiles = [...images];
    const newPreviews = [...previews];
    newFiles[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setImages(newFiles);
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newFiles = [...images];
    const newPreviews = [...previews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Images (max {maxImages})</label>
      <div className="flex space-x-4">
        {[...Array(maxImages)].map((_, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border-2 rounded-md flex items-center justify-center cursor-pointer border-dashed border-gray-400 hover:border-teal-500"
            onClick={() => document.getElementById(`imageUpload${index}`)?.click()}
          >
            {previews[index] ? (
              <>
                <img
                  src={previews[index]}
                  className="w-full h-full object-cover rounded-md"
                  alt={`preview-${index}`}
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
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message || error}</p>}
    </div>
  );
};

export default ImageUploader;
