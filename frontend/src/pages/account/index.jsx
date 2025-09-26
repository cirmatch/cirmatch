import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { useUserOrders } from "@/hooks/useUserOrders";
import OrderCard from "@/components/Account/OrderCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function UserDetailsAndOrderStatus() {
  const { userOrder, isLoading, isError, message } = useUserOrders();

  return (
    <UserLayout>
      <Head><title>User Orders</title></Head>
      <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="px-10 py-6 flex-1 flex flex-col gap-10">
            {isLoading && <p>Loading orders...</p>}
            {isError && <p className="text-red-600">{message || "Error loading orders."}</p>}

            {userOrder.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-teal-600 mb-6">Order Details</h2>
                <div className="relative w-full">
                  <button className="swiper-button-prev-custom absolute top-1/2 left-0 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-500 hover:text-white cursor-pointer transition-colors">
                    <BsChevronLeft className="w-6 h-6" />
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

                  <button className="swiper-button-next-custom absolute top-1/2 right-0 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-500 hover:text-white cursor-pointer transition-colors">
                    <BsChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </UserLayout>
  );
}
