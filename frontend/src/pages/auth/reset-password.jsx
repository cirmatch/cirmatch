// pages/reset-password.js
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { resetPassword } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducers/authReducer";

// PasswordInput component
const PasswordInput = ({ label, value, onChange, show, toggleShow, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [show]);

  return (
    <div className="mb-6">
      <label className="block text-teal-700 font-medium mb-2">{label}</label>
      <div className="flex items-center border border-teal-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-400 focus-within:border-teal-400 transition duration-300">
        <input
          ref={inputRef}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 p-3 text-gray-800 outline-none"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="px-3 text-teal-500 hover:text-teal-700 transition duration-200"
        >
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.94 10.94 0 0112 20c-5 0-9.27-3-11-7a11.07 11.07 0 011.76-3.22" />
              <path d="M1 1l22 22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default function ResetPassword() {
  const router = useRouter();
  const { identifier, code } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false); // single state for both

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    dispatch(resetPassword({ identifier, code, newPassword }));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      dispatch(emptyMessage());
    }
    if (isSuccess && message) {
      toast.success(message);
      dispatch(emptyMessage());
      setTimeout(() => router.push("/auth"), 200);
    }
  }, [isError, isSuccess, message, dispatch, router]);

  const toggleShowPasswords = () => setShowPasswords(!showPasswords);

  return (
    <UserLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-3xl p-10 sm:p-12 w-full max-w-md transform transition duration-500 hover:scale-105">
          <h2 className="text-3xl font-extrabold text-teal-800 mb-8 text-center">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit}>
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              show={showPasswords}
              toggleShow={toggleShowPasswords}
              placeholder="Enter new password"
            />

            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              show={showPasswords}
              toggleShow={toggleShowPasswords}
              placeholder="Confirm new password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 cursor-pointer transform hover:scale-105 transition duration-300"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Remembered your password?{" "}
            <a
              href="/auth"
              className="text-teal-500 font-medium hover:text-teal-700 hover:underline transition duration-200"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </UserLayout>
  );
}
