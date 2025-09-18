import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { verifyEmail, resendCode } from "@/config/redux/action/authAction";

export default function VerifyPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { message, isLoading, isSuccess, isError } = useSelector((state) => state.auth);

  const [code, setCode] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Load identifier (email or phone number)
  useEffect(() => {
    const storedIdentifier = localStorage.getItem("identifier");
    if (storedIdentifier) {
      setIdentifier(storedIdentifier);
    } else {
      alert("No identifier found. Please register first.");
    }
  }, []);

  useEffect(() => {
    if (isSuccess && message === "Verification successful") {
      localStorage.removeItem("identifier");
      router.push("/");
    }
  }, [isSuccess, message, router]);

  // Toast notifications for success and error messages
  useEffect(() => {
    if (isError) toast.error(message);
    else if (isSuccess) toast.success(message);
  }, [isError, isSuccess, message]);

  // Submit verification code
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      toast.error("Enter a valid 6-digit code");
      return;
    }
    dispatch(verifyEmail({ identifier, code }));
  };

  // Resend code
  const handleResend = () => {
    if (!identifier) {
      toast.error("Identifier not found. Please register first.");
      return;
    }
    dispatch(resendCode({ identifier }));
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Verification</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 rounded-md transition ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Timer / Resend */}
        <div className="mt-4 text-center text-sm text-gray-700">
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={isLoading}
              className={`text-blue-600 hover:underline font-medium ${
                isLoading ? "cursor-not-allowed text-gray-400" : "cursor-pointer"
              }`}
            >
              Resend Code
            </button>
          ) : (
            <p>
              Resend available in {timer} second{timer !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
