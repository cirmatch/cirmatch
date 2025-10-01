import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { useUserOrders } from "@/hooks/useUserOrders";
import OrderCard from "@/components/Account/OrderCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Loading from "@/components/Loading";

export default function UserDetailsAndOrderStatus() {
  const { userOrder, isLoading, isError, message } = useUserOrders();

  return (
    <UserLayout>
      <Head>
        <title>User Orders</title>
      </Head>

      <div className="relative flex min-h-screen flex-col bg-gray-50 overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="px-6 py-8 flex-1 flex flex-col gap-10">
            <h1 className="text-4xl font-bold text-teal-600 mb-8">Your Orders</h1>

            {/* Loading */}
            {isLoading && (
              <Loading/>
            )}



            {/* Orders */}
            {userOrder.length > 0 ? (
              <div className="relative w-full">
                {/* Navigation buttons */}
                <button className="swiper-button-prev-custom absolute top-1/2 left-0 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-teal-500 hover:text-white cursor-pointer transition-colors">
                  <BsChevronLeft className="w-6 h-6" />
                </button>
                <button className="swiper-button-next-custom absolute top-1/2 right-0 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-teal-500 hover:text-white cursor-pointer transition-colors">
                  <BsChevronRight className="w-6 h-6" />
                </button>

                <Swiper
                  modules={[Navigation]}
                  spaceBetween={30}
                  navigation={{
                    prevEl: ".swiper-button-prev-custom",
                    nextEl: ".swiper-button-next-custom",
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="w-full"
                >
                  {userOrder.map((order, index) => (
                    <SwiperSlide key={order._id}>
                      <OrderCard order={order} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : !isLoading && (
              // No orders UI
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="bg-white rounded-xl p-12 flex flex-col items-center shadow-md">
                  <AiOutlineShoppingCart className="w-20 h-20 text-teal-400 mb-6" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    No Orders Yet
                  </h2>
                  <p className="text-gray-500 text-center">
                    {message} 
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </UserLayout>
  );
}
