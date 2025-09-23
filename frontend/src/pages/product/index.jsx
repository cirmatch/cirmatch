// components/Listing.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { getAllListing } from "@/config/redux/action/productAction";
import { fadeIn, textVariant } from "@/utils/motion";
import UserLayout from "@/layout/clienLayout/UserLayout";
import Loading from "@/components/Loading";
import ProductHomeSection from "@/components/HomeComponents/ProductHomeSection";


/**
 * Listing Component
 * 
 * Fetches and displays all confirmed product listings grouped by plastictype.
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

  // Group listings by plastictype
  const listingsByPlasticType = listings.reduce((acc, listing) => {
    if (listing.Status === "confirmed") { // Only include confirmed
      const type = listing.plastictype;
      if (!acc[type]) acc[type] = [];
      acc[type].push(listing);
    }
    return acc;
  }, {});

  // Get all plastic types
  const plasticTypes = Object.keys(listingsByPlasticType);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-10">
        {/* Render sections per plastictype */}
        {plasticTypes.map((type) =>
          listingsByPlasticType[type].length > 0 ? (
            <ProductHomeSection
              key={type}
              product={listingsByPlasticType[type]}
              category={type.toUpperCase()}
            />
          ) : null
        )}
      </div>
    </UserLayout>
  );
};

export default Listing;
