import { useState } from "react";

export const useListingForm = (initial = {}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    plastictype: "",
    metarialtype: "",
    images: [],        
    quantity: "",
    price: "",
    location: "",
    color: "",
    sourcingCondition: "",
    washingProcess: "",
    ...initial,
  });

  // preview is array of URLs for all images
  const [preview, setPreview] = useState([]); 
  const [formError, setFormError] = useState("");

  // handleChange will ONLY handle non-image fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // ignore here because images handled separately with index-based input
      return;
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate required fields
  const validateForm = (requiredFields) => {
    for (let field of requiredFields) {
      const value = formData[field];

      if (field !== "sourcingCondition" && field !== "washingProcess") {
        if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          setFormError(`❗ ${field.toUpperCase()} is required`);
          return false;
        }
      }
    }
    setFormError("");
    return true;
  };

  // Validate images (only count real files)
  const validateImages = () => {
    const validFiles = (formData.images || []).filter((f) => f instanceof File);

    if (validFiles.length === 0) {
      setFormError("❗ At least one image is required");
      return false;
    }
    setFormError("");
    return true;
  };

  return {
    formData,
    setFormData,
    preview,
    setPreview,
    formError,
    setFormError,
    handleChange,
    validateForm,
    validateImages,
  };
};
