/**
 * Hero Component
 * -----------------------
 * - Landing section of the homepage
 * - Displays brand title, tagline, description, CTA button, and hero image
 * - Uses Framer Motion for animations
 * - Uses Next.js Image optimization
 */

import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion"; // Animation variants
import heroImage from '../../assets/hero.jpg'
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="flex flex-col md:flex-row justify-between px-4 sm:px-6 lg:px-8 pt-8 pb-16 container mx-auto"
    >
      {/* ======================
          LEFT COLUMN (Text + CTA)
         ====================== */}
      <div className="w-full md:w-1/2 space-y-8">

        {/* Main Heading (Brand + Tagline) */}
        <motion.h1 
          variants={textVariant(0.3)} // Animate heading with delay
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

        {/* Description Paragraph */}
        <motion.p 
          variants={fadeIn('up', 0.4)} // Fade in text
          initial="hidden"
          whileInView="show"
          className="text-gray-600 text-lg md:text-xl max-w-xl"
        >
          বাংলাদেশের সবচেয়ে বেশী buyer এবং seller আছে cirmatch.com এর মার্কেটপ্লেসে । তাই, এক জায়গায় রিসাইক্লিং প্লাস্টিকের সব টাইপের Product Or Materials  কেনাবেচা করুন cirmatch এর Verified Buyer and Seller এর সাথে। 
<br /><br />
So Buy and Sell easily on cirmatch.com 
        </motion.p>

        {/* Primary CTA Button */}
        <div className="flex mt-10">
          <Link
            href="/addNew"
            className="rounded-full bg-teal-500 px-8 py-3 text-lg font-semibold text-white shadow-lg 
           transition-all duration-300 ease-in-out 
           hover:bg-teal-600 hover:shadow-teal-400/50 hover:shadow-xl 
           active:scale-95"
          >
            Add My Product
          </Link>
        </div>
      </div>

      {/* ======================
          RIGHT COLUMN (Hero Image)
         ====================== */}
      <motion.div 
        variants={fadeIn('left', 0.5)} // Slide image from left
        initial="hidden"
        whileInView="show"
        className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12"
      >
        <div className="relative">
          {/* Hero Image */}
          <Image
            src={heroImage}
            alt="Team meeting"
            className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
            priority // Load image faster for performance
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero