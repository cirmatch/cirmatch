// pages/search.jsx

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import UserLayout from "@/layout/clienLayout/UserLayout";
import ListingCard from "@/components/Product/listingCard";
import Loading from "@/components/Loading";
import { searchProduct } from "@/config/redux/action/productAction";
import { textVariant, fadeIn } from "@/utils/motion";
import ErrorPage from "../404";

/**
 * SearchPage Component
 * 
 * Displays search results based on user query.
 * Shows loading indicator while fetching, handles empty or invalid queries,
 * and displays results with animated listing cards.
 */
const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query; // Search query from URL

  const dispatch = useDispatch();

  // Access search results and loading state from Redux
  const { searchListings, isLoading } = useSelector((state) => state.product);

  // Fetch search results whenever the query changes
  useEffect(() => {
    if (q) {
      dispatch(searchProduct(q));
    }
  }, [dispatch, q]);

  // Display loading indicator while fetching data
  if (isLoading) {
    return (
      <UserLayout>
        <Loading />
      </UserLayout>
    );
  }

  // Show message if no query is entered
  if (!q) {
    return (
      <UserLayout>
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-center text-2xl font-semibold text-gray-600">
            Please enter a search term.
          </h2>
        </div>
      </UserLayout>
    );
  }

  // Show message if no products match the search query
  if (!isLoading && searchListings.length === 0) {
    return (
        <ErrorPage
          code="404"
          message={`No products found for "${q}"`}
          buttonText="Go Back To Product Page"
          buttonLink="/product"
        />
    );
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-10">
        {/* Search Results Title */}
        <motion.h3
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-bold text-teal-600 mb-6"
        >
          Showing Results for "{q}"
        </motion.h3>

        <hr className="mb-8 border-gray-300" />

        {/* Search Listings */}
        <div className="flex flex-wrap gap-6 justify-center">
          {searchListings
            .filter((listing) => listing.Status === "confirmed") // Only confirmed listings
            .map((listing, index) => (
              <ListingCard
                key={listing._id}           // Unique key for each card
                listing={listing}           // Pass listing data
                index={index}               // Index for staggered animation
                variants={fadeIn("up", index * 0.1)} // Fade-in animation
              />
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default SearchPage;
