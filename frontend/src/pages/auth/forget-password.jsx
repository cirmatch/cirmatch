import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { forgetPassword } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducers/authReducer";

export default function ForgetPassword() {
  const [identifier, setIdentifier] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier) {
      return toast.error("Please enter your email or phone number");
    }

    localStorage.setItem("identifier", identifier);
    localStorage.setItem("verifyType", "reset");

    // Dispatch the thunk
    dispatch(forgetPassword({ identifier }));
  };

  // Handle toast and redirect when Redux state changes
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      dispatch(emptyMessage());
    }
    if (isSuccess && message) {
      toast.success(message);
      dispatch(emptyMessage());
      router.push(`/auth/verifyMail?identifier=${identifier}`);
    }
  }, [isError, isSuccess, message, dispatch, router, identifier]);

  return (
    <UserLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md transform transition hover:scale-105">
          <h2 className="text-3xl font-extrabold text-teal-800 mb-6 text-center">
            Forget Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-teal-700 font-semibold mb-2">
                Email or Phone Number
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email or phone"
                className="w-full border border-teal-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 cursor-pointer transform hover:scale-105 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
