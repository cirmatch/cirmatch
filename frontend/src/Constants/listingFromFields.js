import * as yup from "yup";

export const listingFormFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter listing title",
    validation: yup.string().required("Title is required"),
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter description",
    validation: yup.string().required("Description is required"),
  },
  {
    name: "plastictype",
    label: "Plastic Type",
    type: "text",
    placeholder: "e.g., Pet, PP....",
    validation: yup.string().required("Plastic type is required"),
  },
  {
    name: "metarialtype",
    label: "Material Type",
    type: "text",
    placeholder: "e.g., Flaks, Pallet....",
    validation: yup.string().required("Material type is required"),
  },
  {
    name: "sourcingCondition",
    label: "Sourcing Condition",
    type: "select",
    options: ["Post Consumer", "Post Industrial", "Mixed"],
    validation: yup.string(), // optional
  },
  {
    name: "washingProcess",
    label: "Washing Process",
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
    label: "Color",
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
