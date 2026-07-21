import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaExchangeAlt, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-xl border-t-4 border-t-[#2E7D32] shadow-xl mt-12 sm:mt-16">
      <div className="w-[90%] max-w-6xl mx-auto py-10 sm:py-12">
        
        {/* Main Flex Row Container with Wide Spacing */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 lg:gap-24">
          
          {/* Logo & Tagline */}
          <div className="max-w-xs text-left">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#1E5621] text-white flex items-center justify-center font-extrabold shadow-md shadow-[#2E7D32]/20 text-sm">
                <FaExchangeAlt />
              </span>
              <h2 className="text-2xl font-extrabold text-[#2E7D32] tracking-tight">
                Swap<span className="text-[#F4A261]">Hub</span>
              </h2>
            </Link>

            <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-medium">
              Exchange products smarter and give unused items a new life.
            </p>
          </div>

          {/* Quick Links & Contact Columns Group */}
          <div className="flex flex-row items-start justify-between w-full md:w-auto gap-12 sm:gap-16 md:gap-20 lg:gap-28">
            
            {/* Quick Links Column */}
            <div className="flex flex-col text-left">
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 mb-3 border-b-2 border-[#2E7D32] pb-1 inline-block">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-gray-600">
                <Link to="/" className="hover:text-[#2E7D32] hover:translate-x-1 transition-all">
                  Home
                </Link>
                <Link to="/products" className="hover:text-[#2E7D32] hover:translate-x-1 transition-all">
                  Products
                </Link>
                <Link to="/login" className="hover:text-[#2E7D32] hover:translate-x-1 transition-all">
                  Login
                </Link>
                <Link to="/register" className="hover:text-[#2E7D32] hover:translate-x-1 transition-all">
                  Register
                </Link>
              </div>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col text-left">
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 mb-3 border-b-2 border-[#F4A261] pb-1 inline-block">
                Contact
              </h3>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-gray-600">
                <a
                  href="mailto:support@swaphub.com"
                  className="inline-flex items-center gap-2 hover:text-[#2E7D32] transition-colors"
                >
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-[#2E7D32]">
                    <FaEnvelope />
                  </span>
                  support@swaphub.com
                </a>
                <span className="inline-flex items-center gap-2 text-gray-600">
                  <span className="p-1.5 rounded-lg bg-amber-50 text-[#F4A261]">
                    <FaMapMarkerAlt />
                  </span>
                  Indore, MP
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 font-semibold">
          <p>© 2026 SwapHub. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <FaHeart className="text-red-500 text-xs" /> for smart exchanges.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;