import UserLayout from "@/layout/clienLayout/UserLayout";
import Link from "next/link";

export default function Custom404() {
  return (
    <UserLayout>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="text-white bg-teal-600 px-6 py-3 rounded hover:bg-teal-700 transition"
      >
        Go Back Home
      </Link>
    </div></UserLayout>
  );
}
