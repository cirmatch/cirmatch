import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";

const ListingCard = ({ listing, index }) => {
  const quan = listing?.quantity || ""; 
  const match = quan.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);

  const number = match ? match[1] : quan;
  const unit = match ? match[3].toUpperCase() : "";

  return (
    <motion.div
      key={listing._id}
      variants={fadeIn("up", index * 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-xs"
    >
      <Link
        href={`/product/${listing._id}`}
        className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="relative w-full h-48">
          <Image
            src={listing.images[0]?.path || "/default.jpg"}
            alt={listing.title}
            fill
            className="object-cover rounded-t-lg"
            priority={index === 0} // optional: prioritize first image for performance
          />
        </div>

        <div className="p-4 space-y-2">
          <h4 className="text-lg font-semibold">{listing.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-1">{listing.description}</p>
          <h5 className="text-md font-medium text-teal-600">
            Price: <span className="text-xl font-bold">৳</span> {listing.price} / {unit || "unit"}
          </h5>
          <p className="text-sm text-gray-700">
            Quantity: {number} {unit}
          </p>
          <button className="w-full mt-2 py-2 border border-teal-500 text-teal-600 cursor-pointer hover:bg-teal-500 hover:text-white rounded transition">
            Show Detail
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
