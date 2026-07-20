import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import books from "../assets/books.png";
import mobile from "../assets/mobile.png";
import electronics from "../assets/electronics.png";
import gaming from "../assets/gaming.png";
import accessories from "../assets/accessories.png";
import homeItems from "../assets/homeItems.png";
import { motion } from "framer-motion";
import { FaUpload, FaSearch, FaExchangeAlt, FaHandshake } from "react-icons/fa";

const Home = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden bg-gray-50/50">

            {/* Hero Section */}
            <section className="w-[90%] max-w-6xl mx-auto min-h-[80vh] flex items-center justify-center py-10 md:py-16">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center text-left"
                    >
                        <span className="self-start inline-block bg-[#F4A261]/20 text-[#F4A261] border border-[#F4A261]/30 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium mb-4">
                            Smart Product Exchange Platform
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                            Exchange Products
                            <span className="text-[#2E7D32]"> Smarter</span>,
                            <br className="hidden lg:inline" /> Not Costlier.
                        </h1>
                        <p className="text-gray-600 text-sm md:text-lg mt-5 leading-relaxed max-w-xl">
                            Swap books, mobiles, gadgets and other useful products with
                            people around you. Give unused items a new life and discover
                            something valuable without spending money.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link
                                to="/products"
                                className="bg-[#2E7D32] hover:bg-[#236327] text-white font-semibold px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#2E7D32]/25 text-center text-sm md:text-base min-w-[150px]"
                            >
                                Explore Products
                            </Link>
                            <Link
                                to="/register"
                                className="border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white font-semibold px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 text-center text-sm md:text-base min-w-[150px] shadow-sm"
                            >
                                Join Now
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center items-center w-full"
                    >
                        <motion.img
                            src={logo}
                            alt="SwapHub"
                            animate={{
                                y: [0, -16, 0],
                                scale: [1, 1.03, 1],
                            }}
                            transition={{
                                duration: 3.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px] object-contain select-none drop-shadow-[0_20px_35px_rgba(46,125,50,0.18)]"
                        />
                    </motion.div>
                </div>
            </section>

            {/* How SwapHub Works */}
            <section className="w-[92%] max-w-6xl mx-auto py-10 md:py-16">
                <div className="text-center mb-10 md:mb-14">
                    <span className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                        Simple 4-Step Process
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                        How SwapHub Works
                    </h2>
                </div>

                {/* Mobile: 2x2 (grid-cols-2) | Desktop: 4 Columns (md:grid-cols-4) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
                    {/* Step 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative group bg-white border border-gray-100 hover:border-[#2E7D32]/40 shadow-sm hover:shadow-xl hover:shadow-[#2E7D32]/10 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaUpload className="text-2xl sm:text-4xl" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                Upload Product
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                                List your unused product.
                            </p>
                        </div>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative group bg-white border border-gray-100 hover:border-[#F4A261]/40 shadow-sm hover:shadow-xl hover:shadow-[#F4A261]/10 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaSearch className="text-2xl sm:text-4xl" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors">
                                Browse Products
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                                Discover items for exchange.
                            </p>
                        </div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative group bg-white border border-gray-100 hover:border-[#2E7D32]/40 shadow-sm hover:shadow-xl hover:shadow-[#2E7D32]/10 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaExchangeAlt className="text-2xl sm:text-4xl" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                Send Request
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                                Request exchange with user.
                            </p>
                        </div>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative group bg-white border border-gray-100 hover:border-[#F4A261]/40 shadow-sm hover:shadow-xl hover:shadow-[#F4A261]/10 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaHandshake className="text-2xl sm:text-4xl" />
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors">
                                Complete Swap
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                                Meet and enjoy your new item.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="w-[92%] max-w-6xl mx-auto py-10 md:py-16">
                <div className="text-center mb-10 md:mb-14">
                    <span className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                        Curated Collections
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                        Popular Categories
                    </h2>
                </div>

                {/* Mobile: 2x2 Grid (grid-cols-2) | Desktop: 3 Columns (md:grid-cols-3) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Books */}
                    <Link to="/products?category=Books" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 14px 30px rgba(46,125,50,0.12)",
                            }}
                            className="group bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center h-full min-h-[220px] md:min-h-[240px] transition-all duration-200"
                        >
                            <img
                                src={books}
                                alt="Books"
                                className="w-20 h-20 md:w-28 md:h-28 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="mt-4 text-center w-full">
                                <h3 className="text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                    Books
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
                                    Exchange books easily.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Mobiles */}
                    <Link to="/products?category=Mobiles" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 14px 30px rgba(46,125,50,0.12)",
                            }}
                            className="group bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center h-full min-h-[220px] md:min-h-[240px] transition-all duration-200"
                        >
                            <img
                                src={mobile}
                                alt="Mobiles"
                                className="w-20 h-20 md:w-28 md:h-28 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="mt-4 text-center w-full">
                                <h3 className="text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                    Mobiles
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
                                    Exchange smartphones.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Electronics */}
                    <Link to="/products?category=Electronics" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 14px 30px rgba(46,125,50,0.12)",
                            }}
                            className="group bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center h-full min-h-[220px] md:min-h-[240px] transition-all duration-200"
                        >
                            <img
                                src={electronics}
                                alt="Electronics"
                                className="w-20 h-20 md:w-28 md:h-28 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="mt-4 text-center w-full">
                                <h3 className="text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                    Electronics
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
                                    Exchange electronic gadgets.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Gaming */}
                    <Link to="/products?category=Gaming" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 14px 30px rgba(46,125,50,0.12)",
                            }}
                            className="group bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center h-full min-h-[220px] md:min-h-[240px] transition-all duration-200"
                        >
                            <img
                                src={gaming}
                                alt="Gaming"
                                className="w-20 h-20 md:w-28 md:h-28 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="mt-4 text-center w-full">
                                <h3 className="text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                    Gaming
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
                                    Swap games and consoles.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Accessories */}
                    <Link to="/products?category=Accessories" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 14px 30px rgba(46,125,50,0.12)",
                            }}
                            className="group bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center h-full min-h-[220px] md:min-h-[240px] transition-all duration-200"
                        >
                            <img
                                src={accessories}
                                alt="Accessories"
                                className="w-20 h-20 md:w-28 md:h-28 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="mt-4 text-center w-full">
                                <h3 className="text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                    Accessories
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
                                    Exchange accessories.
                                </p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Home Items */}
                    <Link to="/products?category=Home%20Items" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0 14px 30px rgba(46,125,50,0.12)",
                            }}
                            className="group bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center h-full min-h-[220px] md:min-h-[240px] transition-all duration-200"
                        >
                            <img
                                src={homeItems}
                                alt="Home Items"
                                className="w-20 h-20 md:w-28 md:h-28 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="mt-4 text-center w-full">
                                <h3 className="text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                    Home Items
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
                                    Exchange home essentials.
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;