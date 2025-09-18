import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import Loading from "@/components/Loading";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { productDetail } from "@/config/redux/action/productAction";
import ProductHomeSection from "@/components/HomeComponents/ProductHomeSection";

import { ProductInfo } from "@/components/Product/ProductInfo";
import { NotFound } from "@/components/NotFound";
import { ProductImages } from "@/components/Product/ProductImage";
import { addCart } from "@/config/redux/action/cartAction";

const SingleProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("Kg"); // default unit
  const dispatch = useDispatch();

  const { relatedProduct, listing, notFound, message, isLoading } = useSelector(
    (state) => state.product
  );
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
    }
  }, [id, dispatch]);

  if (notFound) return <NotFound message={message} />;
  if (isLoading || !listing) return <Loading />;

  const handleAddToCart = () => {
    if (!loggedIn) {
      router.push("/auth");
      return;
    }
    dispatch(addCart({ productId: listing._id, quantity, unit }));
    toast.success("Product added to cart!"); // show toast immediately
  };

  const handleBuyNow = () => {
    if (!loggedIn) {
      router.push("/auth");
      return;
    }
    dispatch(addCart({ productId: listing._id, quantity, unit }));
    toast.success("Product added to cart!");
    router.push("/cart");
  };

  return (
    <UserLayout>
      <motion.div
        variants={{}}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-12"
      >
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
      </motion.div>

      <ProductHomeSection category="related Product" product={relatedProduct} />
    </UserLayout>
  );
};

export default SingleProductDetail;
