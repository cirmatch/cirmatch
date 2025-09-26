import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";

const FeaturesSection = () => {


  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl font-bold mb-4"
        >
          How can we help your business?
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600"
        >
          When you resell besnik, you build trust and increase
        </motion.p>
      </motion.div>
      
      <motion.div
  variants={fadeIn('up', 0.3)}
  className="flex flex-col items-center p-6"
>
  <motion.div
    variants={fadeIn('down', 0.4)}
    className="w-full mb-6 flex items-center justify-center"
  >
    <motion.div
      variants={fadeIn('up', 0.5)}
      className="w-full aspect-video max-w-3xl"
    >
      <iframe
        width="100%"
        height="100%"
        className="rounded-xl"
        src="" 
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  </motion.div>

  <motion.h3
    variants={textVariant(0.3)}
    className="text-2xl font-medium mb-3 text-center"
  >
    Your Video Title Here
  </motion.h3>

  <motion.p
    variants={fadeIn('up', 0.6)}
    className="text-gray-500 text-center max-w-xl"
  >
    This is a short description about the video. You can use this space to add some engaging context or a call to action.
  </motion.p>
</motion.div>
      <motion.div 
        variants={fadeIn('up', 0.7)}
        className="text-center mt-12"
      >
        <motion.button 
          variants={fadeIn('up', 0.8)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 text-white cursor-pointer px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors relative"
        >
          Become a Partner
          <div className="absolute -z-10 w-full h-full rounded-full bg-teal-600/30 blur-xl top-0 left-0"></div>
        </motion.button>
      </motion.div>

    </motion.section>
  )
}

export default FeaturesSection