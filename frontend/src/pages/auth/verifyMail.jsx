import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { verifyEmail, resendCode } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducers/authReducer";

export default function VerifyPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { message, isLoading, isSuccess, isError,loggedIn } = useSelector(
    (state) => state.auth
  );

  const [code, setCode] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [type, setType] = useState("register");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isReady, setIsReady] = useState(false); // ensures localStorage is loaded

  const timerRef = useRef(null);

  // Load identifier and type from localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIdentifier(localStorage.getItem("identifier") || "");
      setType(localStorage.getItem("verifyType") || "register");
      setIsReady(true);
    }
  }, []);

  // Start countdown timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(60);
    setCanResend(false);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Initialize timer on page load
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  // Listen for Redux auth changes
  useEffect(() => {
    if (!isReady) return; // wait until localStorage is loaded

    if (isError && message) {
      toast.error(message);
      dispatch(emptyMessage());
    }

    if (isSuccess && message) {
      toast.success(message);
      dispatch(emptyMessage());

      if (type === "register" && loggedIn ) {
        localStorage.removeItem("identifier");
        localStorage.removeItem("verifyType");
        router.push("/");
      } else if (type === "reset") {
        router.push(
          `/auth/reset-password?identifier=${identifier}&code=${code}`
        );
      }
    }
  }, [isSuccess, isError, message, dispatch, type, router, identifier, code, isReady]);

  // Handle verification submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      toast.error("Enter a valid 6-digit code");
      return;
    }
    if (!identifier) {
      toast.error("Identifier not found.");
      return;
    }
    dispatch(verifyEmail({ identifier, code }));
  };

  // Handle resend code
  const handleResend = () => {
    if (!identifier) return toast.error("Identifier not found.");
    dispatch(resendCode({ identifier }));
    toast.success("Verification code resent!");
    startTimer();
  };

  // Render loading if localStorage not ready
  if (!isReady) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Verification</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
