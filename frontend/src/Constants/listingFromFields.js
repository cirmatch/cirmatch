import * as yup from "yup";

export const listingFormFields = [
  {
    name: "title",
    label: "Product Title",
    type: "text",
    placeholder: "Enter listing title",
    validation: yup.string().required("Title is required"),
  },
    {
    name: "sellername",
    label: "Seller Name",
    type: "text",
    placeholder: "Enter listing Seller Name",
    validation: yup.string().required("Seller Name is required"),
  },
  {
    name: "description",
    label: "Product Description",
    type: "textarea",
    placeholder: "Enter description",
    validation: yup.string().required("Description is required"),
  },
  {
    name: "plastictype",
    label: "Plastic Type",
    type: "text",
    placeholder: "e.g., PET, PP....",
    validation: yup.string().required("Plastic type is required"),
  },
  {
    name: "metarialtype",
    label: "Material Type (Optional)",
    type: "text",
    placeholder: "e.g., flakes, granules....",
    validation: yup.string(),
  },
  {
    name: "sourcingCondition",
    label: "Sourcing Condition (Optional)",
    type: "select",
    options: ["Post Consumer", "Post Industrial", "Mixed"],
    validation: yup.string(), 
  },
  {
    name: "washingProcess",
    label: "Washing Process (Optional)",
    type: "select",
    options: ["Cold Wash", "Hot Wash", "Unwashed"],
    validation: yup.string(), // optional
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "e.g., Dhaka",
    validation: yup.string().required("Location is required"),
  },
  {
    name: "color",
    label: "Color (Optional)",
    type: "text",
    placeholder: "e.g., Blue",
    validation: yup.string(),
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "e.g., 100",
    validation: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
  },

];

// Create validation schema dynamically from form fields
export const listingValidationSchema = yup.object().shape(
  listingFormFields.reduce((acc, field) => {
    if (field.validation) {
      acc[field.name] = field.validation;
    }
    return acc;
  }, {})
);
