import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-t-[#2E7D32] shadow-sm mt-6 sm:mt-10">
      <div className="w-[90%] max-w-6xl mx-auto py-8">
        
        {/* Main Container: Flex row on desktop, stacked on mobile with Quick Links & Contact side-by-side */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Logo & Tagline */}
          <div className="max-w-xs text-left">
            <h2 className="text-2xl font-extrabold text-[#2E7D32] tracking-tight">
              Swap<span className="text-[#F4A261]">Hub</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Exchange products smarter and give unused items a new life.
            </p>
          </div>

          {/* Quick Links & Contact: Side-by-Side (flex-row) on ALL screens */}
          <div className="flex flex-row items-start justify-between w-full md:w-auto gap-8 sm:gap-16">
            
            {/* Quick Links Column */}
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-3 border-b-2 border-[#2E7D32] pb-1 inline-block">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2 text-xs sm:text-sm font-medium text-gray-600">
                <Link to="/" className="hover:text-[#2E7D32] transition-colors">
                  Home
                </Link>
                <Link to="/products" className="hover:text-[#2E7D32] transition-colors">
                  Products
                </Link>
                <Link to="/login" className="hover:text-[#2E7D32] transition-colors">
                  Login
                </Link>
                <Link to="/register" className="hover:text-[#2E7D32] transition-colors">
                  Register
                </Link>
              </div>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-3 border-b-2 border-[#F4A261] pb-1 inline-block">
                Contact
              </h3>
              <div className="flex flex-col gap-2 text-xs sm:text-sm font-medium text-gray-600">
                <a
                  href="mailto:support@swaphub.com"
                  className="inline-flex items-center gap-1.5 hover:text-[#2E7D32] transition-colors"
                >
                  <FaEnvelope className="text-[#2E7D32]" />
                  support@swaphub.com
                </a>
                <span className="inline-flex items-center gap-1.5 text-gray-600">
                  <FaMapMarkerAlt className="text-[#F4A261]" />
                  Indore, MP
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="border-t border-gray-100 mt-8 pt-4 text-center text-xs text-gray-400 font-medium">
          © 2026 SwapHub. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;