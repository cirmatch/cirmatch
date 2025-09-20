// components/Footer.jsx

import { motion } from "framer-motion";
import { floatIn, scale, staggerContainer } from "@/utils/motion";
import { footerLinks } from "@/Constants/footerConstants";

import FooterBrand from "./FooterBrand";
import FooterLinksColumn from "./FooterLinksColumn";

const Footer = () => {
  return (
    <motion.footer
      variants={scale(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <motion.div
          variants={staggerContainer(0.2, 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
        >
          {/* Left Brand Column */}
          <motion.div variants={floatIn(0.3)} className="lg:col-span-4">
            <FooterBrand />
          </motion.div>

          {/* Right Links Columns */}
          <motion.div
            variants={staggerContainer(0.2, 0.5)}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <motion.div key={category} variants={floatIn(0.2 + idx * 0.1)}>
                <FooterLinksColumn
                  category={category}
                  links={links}
                  index={idx}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          variants={floatIn(0.8)}
          className="border-t border-gray-700 mt-12 pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <motion.p variants={floatIn(1.0)}>
              © {new Date().getFullYear()} cirmatch.com — All rights reserved.
            </motion.p>
            <motion.p variants={floatIn(1.1)}>
              Cirmatch Team
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
