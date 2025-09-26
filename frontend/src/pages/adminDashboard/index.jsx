import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStats } from "@/config/redux/action/authAction";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import Loading from "@/components/Loading";

export default function Dashboard() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserStats());
  }, [dispatch]);

  if (authState.isLoading) {
    return <AdminLayout><Loading/></AdminLayout>;
  }




  return (
    <AdminLayout>
      <div
        className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
        style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
      >
        <main className="px-10 py-5 flex-1 flex justify-center">
          <div className="max-w-[960px] w-full flex flex-col">

            {/* Title Section */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="min-w-72 flex flex-col gap-3">
                <p className="text-[32px] font-bold leading-tight text-teal-600">
                  Dashboard
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              {[
                { title: "Total Users", value:  authState.userGrowth?.totalUsers, change:  authState.userGrowth?.growthPercent },
                // { title: "Total Orders", value: "875", change: "+5%" },
                // { title: "Revenue", value: "$55,000", change: "+8%" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="min-w-[158px] flex-1 bg-teal-100 hover:bg-teal-200 transition rounded-lg p-6 flex flex-col gap-2 cursor-pointer"
                >
                  <p className="text-base font-medium text-teal-700">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold leading-tight text-teal-900">
                    {stat.value}
                  </p>
                  <p className="text-teal-600 text-base font-medium">
                    +{stat.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}
