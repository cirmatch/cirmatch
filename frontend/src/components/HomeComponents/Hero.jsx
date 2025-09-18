import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import heroImage from '../../assets/hero.jpg'
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="flex flex-col md:flex-row justify-between px-4 sm:px-6 lg:px-8 pt-8 pb-16 container mx-auto">
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-8">

        <motion.h1 
          variants={textVariant(0.3)}
          initial="hidden"
          whileInView="show"
          className="text-xl md:text-2xl lg:text-2xl font-bold leading-tight pt-10 lg:pt-50 "
        >
          cirmatch.com
          <br />
          <br />
          <span className="text-teal-500 relative inline-block">
            একটি অনলাইন মার্কেটপ্লেস যেখানে যাবতীয় প্লাস্টিক রিসাইক্লিং প্রোডাক্ট (যেমন : বোতল, কুঁচি, দানা,....) কেনাবেচা করা যায়।
          </span>{' '}

        </motion.h1>

        <motion.p 
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          className="text-gray-600 text-lg md:text-xl max-w-xl"
        >
          বাংলাদেশের সবচেয়ে বেশী buyer এবং seller আছে cirmatch.com এর মার্কেটপ্লেসে । তাই, এক জায়গায় রিসাইক্লিং প্লাস্টিকের সব টাইপের Product Or Materials  কেনাবেচা করুন cirmatch এর Verified Buyer and Seller এর সাথে। 
<br /><br />
So Buy and Sell easily on cirmatch.com 
        </motion.p>


      </div>

      {/* Right Column - Images */}
      <motion.div 
        variants={fadeIn('left', 0.5)}
        initial="hidden"
        whileInView="show"
        className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12"
      >
        <div className="relative">
          <Image
            src={heroImage}
            alt="Team meeting"
            className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
            priority
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero