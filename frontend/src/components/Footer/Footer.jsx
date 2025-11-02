import { footerLinks } from "@/Constants/footerConstants";
import FooterBrand from "./FooterBrand";
import FooterLinksColumn from "./FooterLinksColumn";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Left Brand Column */}
          <div className="lg:col-span-4">
            <FooterBrand />
          </div>

          {/* Right Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <div key={category}>
                <FooterLinksColumn
                  category={category}
                  links={links}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} cirmatch.com — All rights reserved.
            </p>
            <p>Cirmatch Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
