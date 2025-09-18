import AuthForm from "@/components/Auth/AuthForm";
import AuthTogglePanel from "@/components/Auth/AuthTogglePanel";
import { emptyMessage } from "@/config/redux/reducers/authReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(emptyMessage())
    }, [isLogin])

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-6xl  bg-white rounded-2xl shadow-2xl overflow-hidden drop-shadow-[0_10px_40px_rgba(0,244,256,0.8)]">
        <div className="flex flex-col md:flex-row transition-all duration-500 ease-in-out">
          {/* Login Panel */}
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
