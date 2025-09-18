import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";

const FooterLinksColumn = ({ category, links, index }) => (
  <motion.div variants={fadeIn("up", 0.3 * (index + 1))}>
    <motion.h3 variants={textVariant(0.2)} className="text-lg font-medium mb-4 text-white capitalize">
      {category}
    </motion.h3>
    <motion.ul variants={fadeIn("up", 0.4)} className="space-y-3">
      {links.map(({ name, href }, idx) => (
        <motion.li key={idx} variants={fadeIn("up", 0.1 * (idx + 1))}>
          <motion.a whileHover={{ x: 5 }} href={href} className="text-gray-600 hover:text-teal-600">
            {name}
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
);

export default FooterLinksColumn;
