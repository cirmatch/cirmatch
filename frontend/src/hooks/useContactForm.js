import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/Constants/contactValidationSchema";

const useContactForm = () => {
  return useForm({
    resolver: yupResolver(contactSchema),
  });
};

export default useContactForm;