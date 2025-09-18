// components/Listing.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAllListing } from "@/config/redux/action/productAction";
import { fadeIn, textVariant } from "@/utils/motion";
import UserLayout from "@/layout/clienLayout/UserLayout";
import Loading from "@/components/Loading";
import ListingCard from "@/components/Product/listingCard";

const Listing = () => {
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllListing());
  }, [dispatch]);

  if (isLoading) {
    return (
      <UserLayout>
        <Loading />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-10">
        <motion.h3
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-bold text-teal-600 mb-6"
        >
          All Listings
        </motion.h3>

        <hr className="mb-8 border-gray-300" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {listings
            .filter((listing) => listing.Status === "confirmed") // <-- Only confirmed listings
            .map((listing, index) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                index={index}
                variants={fadeIn("up", index * 0.1)}
              />
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Listing;
