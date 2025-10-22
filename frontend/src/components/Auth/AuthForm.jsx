import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "./input";
import Button from "./Button";
import { loginUser, registerUser } from "@/config/redux/action/authAction";
import { formFields, loginSchema, registerSchema, userIcon } from "@/Constants/authFormConstants";
import { emptyMessage } from "@/config/redux/reducers/authReducer";
import Link from "next/link";

export default function AuthForm({ mode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const isLogin = mode === "login";
  const fields = formFields[mode];

  const [redirectUrl, setRedirectUrl] = useState("/product"); // default value

  // Validation Schema
  const validationSchema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // ✅ Client-side only localStorage access
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRedirect = localStorage.getItem("redirectAfterLogin");
      if (storedRedirect) setRedirectUrl(storedRedirect);
    }
  }, []);

  useEffect(() => {
    if (authState.loggedIn && authState.user) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("redirectAfterLogin");
      }
      router.push(redirectUrl);
    }
  }, [authState.loggedIn, router, redirectUrl]);

  useEffect(() => {
    if (authState.isError && authState.message) {
      toast.error(authState.message);
      setTimeout(() => {
        dispatch(emptyMessage());
      }, 4000); 
    } else if (authState.isSuccess && authState.message) {
      toast.success(authState.message);
      setTimeout(() => {
        dispatch(emptyMessage());
      }, 4000); 
    }
  }, [authState.isError, authState.isSuccess, authState.message, dispatch]);

  const onSubmit = async (formData) => {
    try {
      if (isLogin) {
        await dispatch(loginUser(formData)).unwrap();
      } else {
        await dispatch(registerUser(formData)).unwrap();
        if (typeof window !== "undefined") {
          localStorage.setItem("identifier", formData.identifier);
          localStorage.setItem("verifyType", "register");
        }
        router.push("/auth/verifyMail");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-1/2 p-6 md:p-10 bg-gray-100 bg-opacity-40 rounded-md shadow-lg"
    >
      <h2 className="text-teal-400 text-2xl md:text-3xl font-bold mb-6 text-center">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>

      {!isLogin && (
        <div className="mb-4">
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="Elon Musk"
            icon={userIcon}
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
      )}

      {fields
        .filter((f) => f.id !== "name")
        .map(({ id, label, type, placeholder, icon }) => (
          <div key={id} className="mb-4">
            <Input
              label={label}
              id={id}
              type={type}
              placeholder={placeholder}
              icon={icon}
              {...register(id)}
            />
            {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
          </div>
        ))}

      <Button className="w-full mt-6" disabled={authState.isLoading}>
        {authState.isLoading ? "Loading..." : isLogin ? "Log In" : "Register"}
      </Button>

      <div className="text-center mt-4">
        <Link
          href="/auth/forget-password"
          className="text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
        >
          {isLogin ? "Forgot Password? Reset it here" : ""}
        </Link>
      </div>
    </form>
  );
}
