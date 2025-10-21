// components/HomeComponents/ProductHomeSection.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import ButtonLink from "../Button/button";
import ListingCard from "@/components/Product/listingCard";
import { useState } from "react";

/**
 * ProductHomeSection Component
 * 
 * Displays a horizontal carousel of products using Swiper.
 * Each Swiper has independent navigation buttons using callback refs.
 * Filters only confirmed products.
 * 
 * Props:
 * - product: array of product listings
 * - category: string representing the category name
 */
const ProductHomeSection = ({ product = [], category }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  // Filter only confirmed products
  const confirmedProducts = product.filter((listing) => listing.Status === "confirmed");
  if (confirmedProducts.length === 0) return null;

  return (
    <section id="product-slider" className="py-16 px-4 max-w-7xl mx-auto">
      {/* Heading and View All Button */}
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        className="flex justify-between mb-12 py-2"
      >
        <motion.p
          variants={fadeIn("up", 0.4)}
          className="text-teal-500 text-3xl font-bold tracking-wide select-none"
        >
          {category.toUpperCase()}
        </motion.p>

        <ButtonLink
          href={`/search?q=${confirmedProducts[0].plastictype}`}
          bgColor="white"
          textColor="#009688"
          border="1px solid #009688"
          hoverText="white"
        >
          View All
        </ButtonLink>
      </motion.div>

      {/* Swiper Carousel with unique navigation buttons */}
      <motion.div
        variants={fadeIn("up", 0.5)}
        initial="hidden"
        whileInView="show"
        className="relative flex items-center gap-4"
      >
        {/* Left Navigation Button */}
        <motion.button
          ref={setPrevEl}
          variants={fadeIn("up", 0.6)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-500 hover:text-white cursor-pointer transition-colors z-10"
        >
          <BsChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl,
            nextEl,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevEl;
            swiper.params.navigation.nextEl = nextEl;
          }}
          className="w-full"
        >
          {confirmedProducts.map((listing, index) => (
            <SwiperSlide key={listing._id} className="h-full flex justify-center">
              <motion.div
                variants={fadeIn("up", 0.3 * (index + 1))}
                className="h-full w-full flex justify-center"
              >
                <div className="w-full">
                  <ListingCard listing={listing} index={index} fullWidth />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Navigation Button */}
        <motion.button
          ref={setNextEl}
          variants={fadeIn("up", 0.6)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-500 hover:text-white cursor-pointer transition-colors z-10"
        >
          <BsChevronRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default ProductHomeSection;
