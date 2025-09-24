// components/Listing.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "@/layout/clienLayout/UserLayout";
import Loading from "@/components/Loading";
import ProductHomeSection from "@/components/HomeComponents/ProductHomeSection";
import { getAllListing } from "@/config/redux/action/productAction";

/**
 * Listing Component
 * 
 * Fetches and displays all confirmed product listings grouped into fixed plastic type sections.
 * Any unknown plastictype will be grouped under 'Other'.
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

  // Filter confirmed listings
  const confirmedListings = listings.filter(l => l.Status === "confirmed");

  // Fixed main plastic types
  const mainTypes = ["PET","Scrap","HDPE","PP","LDPE","POLY","PVC","ABS","EPS","PC","Mixed"];

  // Prepare sections object
  const sections = mainTypes.reduce((acc, type) => {
    acc[type] = confirmedListings.filter(listing => listing.plastictype === type);
    return acc;
  }, {});

  // Add 'Other' section
  sections["Other"] = confirmedListings.filter(
    listing => !mainTypes.includes(listing.plastictype)
  );

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-10">
        {Object.keys(sections).map((type) =>
          sections[type].length > 0 ? (
            <ProductHomeSection
              key={type}
              product={sections[type]}
              category={type.toUpperCase()}
            />
          ) : null
        )}
      </div>
    </UserLayout>
  );
};

export default Listing;
