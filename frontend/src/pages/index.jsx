// pages/index.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";

import UserLayout from "@/layout/clienLayout/UserLayout";
import Loading from "@/components/Loading";
import Hero from "@/components/HomeComponents/Hero";
import ProductHomeSection from "@/components/HomeComponents/ProductHomeSection";
import { category } from "@/config/redux/action/productAction";

const categoryKeys = ["pet", "pp", "ldpe", "hdpe"];

export default function Home() {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(category());
  }, [dispatch]);

  if (isLoading) {
    return (
      <UserLayout>
        <Loading />
      </UserLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Cirmatch - Home</title>
        <meta
          name="description"
          content="Buy and sell recyclable plastic waste products and materials."
        />
        <meta name="google-site-verification" content="bkTnSrE-c5TY3xDcN_zJC62LuSsvnNrRuP_IGkQ9Qfw" />
        <meta
          name="keywords"
          content="Cirmatch, recycling, PET, LDPE, HDPE, PP, waste management, eco-friendly, green tech, sustainable materials"
        />
        <meta name="author" content="Cirmatch Team" />
        <meta property="og:title" content="Cirmatch - Recycle Smarter, Live Greener" />
        <meta
          property="og:description"
          content="Join the future of recycling. Cirmatch helps you buy and sell plastic waste materials like PET, HDPE, LDPE, and more."
        />
        <meta property="og:image" content="/banner.jpg" />
        <meta property="og:url" content="https://cirmatch.com" />
        <meta property="og:type" content="website" />
      </Head>

      <UserLayout>
        <main className="relative min-h-screen overflow-x-hidden">
          <Hero />

          {categoryKeys.map((key) => {
            const products = categories?.[key] || [];
            if (products.length === 0) return null;

            return (
              <ProductHomeSection
                key={key}
                product={products}
                category={key.toUpperCase()}
              />
            );
          })}

          <div className="flex justify-center mt-10">
            <Link
              href="/product"
              className="rounded-full bg-teal-500 px-8 py-3 text-lg font-semibold text-white shadow-lg
                         transition-all duration-300 ease-in-out
                         hover:bg-teal-600 hover:shadow-teal-400/50 hover:shadow-xl
                         active:scale-95 animate-pulse"
            >
              See More
            </Link>
          </div>
          <br />
          <br />
        </main>
      </UserLayout>
    </>
  );
}
