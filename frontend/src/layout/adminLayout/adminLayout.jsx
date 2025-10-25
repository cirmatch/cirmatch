"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Sidebar from "@/components/adminComponents/AdminNavbar/adminNav";
import Loading from "@/components/Loading";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user === null) return; 
    if (!user || user.role !== "admin") {
      router.push("/"); 
    }
  }, [user, router]);

  if (!user) return <Loading />;

  if (user.role !== "admin") {
    return <div className="p-4 text-red-600 font-semibold text-center">Unauthorized</div>;
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-16 md:ml-64 w-full p-4">
        {children}
      </main>
    </div>
    </>
  );
}
