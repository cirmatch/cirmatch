import AuthForm from "@/components/Auth/AuthForm";
import AuthTogglePanel from "@/components/Auth/AuthTogglePanel";
import { emptyMessage } from "@/config/redux/reducers/authReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(emptyMessage());
  }, [isLogin, dispatch]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4 py-8 relative">
      
      {/* Back arrow button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer text-gray-700 hover:text-teal-600 transition-colors"
      >
        <BsArrowLeft className="w-6 h-6 text-teal-500 cursor-pointer" />
        <span className="font-medium text-lg">Back</span>
      </button>

      {/* Auth container */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden drop-shadow-[0_10px_40px_rgba(0,244,256,0.8)]">
        <div className="flex flex-col md:flex-row transition-all duration-500 ease-in-out">
          {/* Login / Signup Panel */}
          {isLogin ? (
            <>
              <AuthTogglePanel mode="login" onClick={() => setIsLogin(false)} />
              <AuthForm mode="login" />
            </>
          ) : (
            <>
              <AuthForm mode="signup" />
              <AuthTogglePanel mode="signup" onClick={() => setIsLogin(true)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
