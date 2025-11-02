import { socialLinks } from "@/Constants/footerConstants";

const FooterBrand = () => (
  <div className="lg:col-span-4">
    <div className="flex items-center gap-1 mb-3">
      <span className="text-2xl font-medium ml-1 text-teal-500">cirmatch.com</span>
    </div>
    <p className="text-gray-600 mb-6">
      Buy and sell recyclable plastic waste products and materials ( i., bottles, flakes, granules, scrap, etc.)
    </p>
    <div className="flex gap-4">
      {socialLinks.map(({ icon, href }, idx) => (
        <a
          key={idx}
          href={href}
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-600 hover:text-white transition-colors"
        >
          {icon}
        </a>
      ))}
    </div>
  </div>
);

export default FooterBrand;
