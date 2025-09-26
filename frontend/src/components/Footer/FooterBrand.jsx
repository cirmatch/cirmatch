import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { socialLinks } from "@/Constants/footerConstants";

const FooterBrand = () => (
  <motion.div variants={fadeIn("right", 0.4)} className="lg:col-span-4">
    <motion.div variants={fadeIn("down", 0.5)} className="flex items-center gap-1 mb-3">
      <span className="text-2xl font-medium ml-1 text-teal-500">cirmatch.com</span>
    </motion.div>
    <motion.p variants={fadeIn("up", 0.6)} className="text-gray-600 mb-6">
      Buy and sell recyclable plastic waste products and materials ( i., bottles, flakes, granules, scrap, etc.)
    </motion.p>
    <motion.div variants={fadeIn("up", 0.7)} className="flex gap-4">
      {socialLinks.map(({ icon, href }, idx) => (
        <motion.a
          key={idx}
          href={href}
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-600 hover:text-white transition-colors"
        >
          {icon}
        </motion.a>
      ))}
    </motion.div>
  </motion.div>
);

export default FooterBrand;
