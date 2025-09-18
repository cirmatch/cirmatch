export default function AuthTogglePanel({ mode, onClick }) {
  const isLogin = mode === "login";

  return (
    <div className="w-full md:w-1/2 bg-teal-500 text-white p-6 md:p-10 flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        {isLogin ? "Hello" : "Welcome Back!"}
      </h2>
      <p className="mb-4 text-sm md:text-base">
        {isLogin ? "Register now to start your journey" : "Already have an account? Log in!"}
      </p>
      <button
        type="button" 
        className="border-2 cursor-pointer border-white px-6 py-2 rounded-md hover:bg-white hover:text-teal-600 transition"
        onClick={onClick}
      >
        {isLogin ? "Register" : "Log In"}
      </button>
    </div>
  );
}