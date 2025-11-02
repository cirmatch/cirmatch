// pages/product/[id].jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import Loading from "@/components/Loading";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { productDetail } from "@/config/redux/action/productAction";
import { addCart } from "@/config/redux/action/cartAction";

import ProductHomeSection from "@/components/HomeComponents/ProductHomeSection";
import { ProductInfo } from "@/components/Product/ProductInfo";
import { ProductImages } from "@/components/Product/ProductImage";

import ErrorPage from "../404";

/**
 * SingleProductDetail Component
 * 
 * Displays detailed view of a single product.
 * Includes product images, product info, and related products.
 * Handles adding to cart, buying now, and authentication checks.
 */
const SingleProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Local state for quantity and selected unit
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("Kg"); // Default unit

  const dispatch = useDispatch();

  // Access product and auth state from Redux
  const { relatedProduct, listing, notFound, message, isLoading } = useSelector(
    (state) => state.product
  );
  const { loggedIn } = useSelector((state) => state.auth);

  // Fetch product details when the component mounts or id changes
  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
    }
  }, [id, dispatch]);

  // Handle 404 or product not found
  if (notFound) return <ErrorPage message={message} />;

  // Display loading while fetching product details
  if (isLoading || !listing) return <Loading />;

  /**
   * Handle adding product to cart
   * Redirects to login if user is not authenticated
   */
  const handleAddToCart = () => {
    if (!loggedIn) {
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", router.asPath);
      }
      router.push("/auth");
      return;
    }
    dispatch(addCart({ productId: listing._id, quantity, unit }));
    toast.success("Product added to cart!");
  };

  /**
   * Handle buy now action
   * Adds product to cart and redirects to cart page
   */
  const handleBuyNow = () => {
    if (!loggedIn) {
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", router.asPath);
      }
      router.push("/auth");
      return;
    }
    dispatch(addCart({ productId: listing._id, quantity, unit }));
    toast.success("Product added to cart!");
    router.push("/cart");
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Product Images and Info Section */}
        <div className="flex flex-col md:flex-row gap-12">
          <ProductImages images={listing.images} title={listing.title} />
          <ProductInfo
            listing={listing}
            quantity={quantity}
            setQuantity={setQuantity}
            unit={unit}
            setUnit={setUnit}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* Related Products Section */}
      <ProductHomeSection category="Related Products" product={relatedProduct} />
    </UserLayout>
  );
};

export default SingleProductDetail;
