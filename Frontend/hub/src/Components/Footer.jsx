import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-6 sm:mt-10">
      <div className="w-[90%] max-w-6xl mx-auto py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-[#2E7D32]">
              SwapHub
            </h2>

            <p className="text-gray-600 mt-3">
              Exchange products smarter and give unused items a new life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-gray-600">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Contact
            </h3>

            <p className="text-gray-600">
              support@swaphub.com
            </p>

            <p className="text-gray-600 mt-2">
              Indore, Madhya Pradesh
            </p>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          © 2026 SwapHub. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;