// components/Listing.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getAllListing } from "@/config/redux/action/productAction";
import { fadeIn, textVariant } from "@/utils/motion";
import UserLayout from "@/layout/clienLayout/UserLayout";
import Loading from "@/components/Loading";
import ListingCard from "@/components/Product/listingCard";

/**
 * Listing Component
 * 
 * Fetches and displays all confirmed product listings.
 * Integrates Framer Motion for smooth entrance animations
 * and Redux for state management.
 */
const Listing = () => {
  const dispatch = useDispatch();

  // Access listings and loading state from Redux store
  const { listings, isLoading } = useSelector((state) => state.product);

  // Fetch all listings on component mount
  useEffect(() => {
    dispatch(getAllListing());
  }, [dispatch]);

  // Display a loading indicator while fetching data
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
        {/* Page Title with animation */}
        <motion.h3
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-bold text-teal-600 mb-6"
        >
          All Listings
        </motion.h3>

        <hr className="mb-8 border-gray-300" />

        {/* Listings grid with animation for each card */}
        <div className="flex flex-wrap gap-6">
          {listings
            .filter((listing) => listing.Status === "confirmed") // Only display confirmed listings
            .map((listing, index) => (
              <ListingCard
                key={listing._id}            // Unique key for each card
                listing={listing}            // Pass listing data as prop
                index={index}                // Index used for staggered animation
                variants={fadeIn("up", index * 0.1)} // Fade-in animation
              />
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Listing;
