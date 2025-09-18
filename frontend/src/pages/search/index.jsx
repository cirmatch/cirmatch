import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserLayout from '@/layout/clienLayout/UserLayout';
import ListingCard from '@/components/Product/listingCard';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '@/config/redux/action/productAction';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';
import { textVariant, fadeIn } from '@/utils/motion';

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;

  const dispatch = useDispatch();
  const { searchListings, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (q) {
      dispatch(searchProduct(q));
    }
  }, [dispatch, q]);

  if (isLoading) {
    return (
      <UserLayout>
        <Loading />
      </UserLayout>
    );
  }

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

  if (!isLoading && searchListings.length === 0) {
    return (
      <UserLayout>
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-center text-2xl font-semibold text-red-500">
            No products found for "{q}"
          </h2>
        </div>
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
          Showing Result "{q}"
        </motion.h3>

        <hr className="mb-8 border-gray-300" />

        <div className="flex flex-wrap gap-6 justify-center">
          {searchListings.map((listing, index) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              index={index}
              variants={fadeIn('up', index * 0.1)}
            />
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default SearchPage;
