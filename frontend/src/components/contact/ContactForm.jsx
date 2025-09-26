import { motion } from "framer-motion";
import useContactForm from "@/hooks/useContactForm";
import { useDispatch, useSelector } from "react-redux";
import { addmessage } from "@/config/redux/action/contactAction";
import { reset } from "@/config/redux/reducers/authReducer";
import { toast } from "react-hot-toast";
import { contactFormAnimation, contactFormFields } from "@/Constants/contactValidationSchema";

export default function ContactForm() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.contact);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useContactForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(addmessage(data)).unwrap();
      toast.success("Message sent successfully!");
      resetForm();
      dispatch(reset());
    } catch (error) {
      toast.error(error || "Failed to send message.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-xl p-6 md:w-2/3 mx-auto"
      initial={contactFormAnimation.initial}
      animate={contactFormAnimation.animate}
    >
      {contactFormFields.map((field) => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block mb-2 font-medium text-lg">
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.id}
              rows={field.rows}
              {...register(field.id)}
              className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 ${
                errors[field.id]
                  ? "border-red-500 ring-red-300"
                  : "border-gray-300 focus:ring-teal-500"
              }`}
              aria-invalid={errors[field.id] ? "true" : "false"}
              aria-describedby={field.ariaErrorId}
            />
          ) : (
            <input
              id={field.id}
              type={field.type}
              {...register(field.id)}
              className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 ${
                errors[field.id]
                  ? "border-red-500 ring-red-300"
                  : "border-gray-300 focus:ring-teal-500"
              }`}
              aria-invalid={errors[field.id] ? "true" : "false"}
              aria-describedby={field.ariaErrorId}
            />
          )}

          {errors[field.id] && (
            <p
              id={field.ariaErrorId}
              className="text-red-500 text-sm mt-1"
            >
              {errors[field.id].message}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-teal-600 text-white py-3 rounded-md text-lg transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
        }`}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </motion.form>
  );
}
