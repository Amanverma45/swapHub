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
        <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden bg-gray-50/60">

            {/* Hero Section */}
            <section className="w-[90%] max-w-6xl mx-auto min-h-[85vh] flex items-center justify-center py-10 md:py-16">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center text-center md:text-left items-center md:items-start"
                    >
                        <span className="self-center md:self-start inline-flex items-center gap-2 bg-[#F4A261]/15 text-[#D97706] border border-[#F4A261]/35 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse"></span>
                            Smart Product Exchange Platform
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                            Exchange Products{" "}
                            <span className="text-[#2E7D32] relative inline-block">
                                Smarter
                            </span>,
                            <br className="hidden lg:inline" /> Not Costlier.
                        </h1>

                        <p className="text-gray-600 text-sm md:text-lg mt-5 leading-relaxed max-w-xl mx-auto md:mx-0">
                            Swap books, mobiles, gadgets and other useful products with
                            people around you. Give unused items a new life and discover
                            something valuable without spending money.
                        </p>

                        <div className="flex flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8 flex-nowrap w-full">
                            <Link
                                to="/products"
                                className="relative group inline-flex items-center justify-center font-bold text-white px-4 sm:px-7 py-3 rounded-2xl bg-gradient-to-r from-[#2E7D32] via-emerald-600 to-teal-600 border border-emerald-400/40 shadow-xl shadow-[#2E7D32]/25 hover:shadow-2xl hover:shadow-[#2E7D32]/40 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 text-center text-xs sm:text-base whitespace-nowrap"
                            >
                                <span>Explore Products</span>
                                <span className="ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                            </Link>
                            <Link
                                to="/register"
                                className="relative group inline-flex items-center justify-center font-bold text-[#2E7D32] px-5 sm:px-7 py-3 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-[#2E7D32] hover:to-emerald-600 hover:text-white border-2 border-[#2E7D32] shadow-md hover:shadow-xl hover:shadow-[#2E7D32]/20 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 text-center text-xs sm:text-base whitespace-nowrap"
                            >
                                <span>Join Now</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Animated Hero Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center items-center w-full relative"
                    >
                        <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-[#2E7D32]/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                        <motion.img
                            src={logo}
                            alt="SwapHub"
                            animate={{
                                y: [0, -18, 0],
                                scale: [1, 1.03, 1],
                                rotate: [0, 1, -1, 0],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px] object-contain select-none drop-shadow-[0_20px_40px_rgba(46,125,50,0.2)]"
                        />
                    </motion.div>
                </div>
            </section>

            {/* How SwapHub Works */}
            <section className="w-[92%] max-w-6xl mx-auto py-10 md:py-16">
                <div className="text-center mb-10 md:mb-14">
                    <span className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/25 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
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
                        className="relative group bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-[#2E7D32] text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-sm">
                            01
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaUpload className="text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                Upload Product
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 leading-tight sm:leading-relaxed">
                                List unused items easily with images.
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
                        className="relative group bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-[#F4A261] text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-sm">
                            02
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaSearch className="text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors">
                                Browse Products
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 leading-tight sm:leading-relaxed">
                                Discover items available for swap.
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
                        className="relative group bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-[#2E7D32] text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-sm">
                            03
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaExchangeAlt className="text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                Send Request
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 leading-tight sm:leading-relaxed">
                                Request exchange with one click.
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
                        className="relative group bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-[#F4A261] text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-sm">
                            04
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#F4A261]/15 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaHandshake className="text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors">
                                Complete Swap
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 leading-tight sm:leading-relaxed">
                                Connect and enjoy your new item.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="w-[92%] max-w-6xl mx-auto pt-6 md:pt-10 pb-4 md:pb-6">
                <div className="text-center mb-10 md:mb-14">
                    <span className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/25 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                        Curated Collections
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                        Popular Categories
                    </h2>
                </div>

                {/* Mobile: 2x2 Grid (grid-cols-2) | Desktop: 3 Columns (md:grid-cols-3) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                    {/* Books */}
                    <Link to="/products?category=Books" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-emerald-50/50 rounded-xl sm:rounded-2xl shadow-inner border border-emerald-100/60">
                                <img
                                    src={books}
                                    alt="Books"
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors">
                                    Books
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange books easily.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                                Explore Books &rarr;
                            </span>
                        </motion.div>
                    </Link>

                    {/* Mobiles */}
                    <Link to="/products?category=Mobiles" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-amber-50/50 rounded-xl sm:rounded-2xl shadow-inner border border-amber-100/60">
                                <img
                                    src={mobile}
                                    alt="Mobiles"
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#F4A261] transition-colors">
                                    Mobiles
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange smartphones.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap text-[#F4A261] bg-[#F4A261]/10 border border-[#F4A261]/30 group-hover:bg-[#F4A261] group-hover:text-white transition-all duration-300">
                                Explore Mobiles &rarr;
                            </span>
                        </motion.div>
                    </Link>

                    {/* Electronics */}
                    <Link to="/products?category=Electronics" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-emerald-50/50 rounded-xl sm:rounded-2xl shadow-inner border border-emerald-100/60">
                                <img
                                    src={electronics}
                                    alt="Electronics"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors">
                                    Electronics
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange gadgets.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                                Explore Electronics &rarr;
                            </span>
                        </motion.div>
                    </Link>

                    {/* Gaming */}
                    <Link to="/products?category=Gaming" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-amber-50/50 rounded-xl sm:rounded-2xl shadow-inner border border-amber-100/60">
                                <img
                                    src={gaming}
                                    alt="Gaming"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#F4A261] transition-colors">
                                    Gaming
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Swap games & consoles.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap text-[#F4A261] bg-[#F4A261]/10 border border-[#F4A261]/30 group-hover:bg-[#F4A261] group-hover:text-white transition-all duration-300">
                                Explore Gaming &rarr;
                            </span>
                        </motion.div>
                    </Link>

                    {/* Accessories */}
                    <Link to="/products?category=Accessories" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative bg-white border border-gray-100 border-t-4 border-t-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-[#2E7D32]/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-emerald-50/50 rounded-xl sm:rounded-2xl shadow-inner border border-emerald-100/60">
                                <img
                                    src={accessories}
                                    alt="Accessories"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors">
                                    Accessories
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange fashion & gear.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                                Explore Accessories &rarr;
                            </span>
                        </motion.div>
                    </Link>

                    {/* Home Items */}
                    <Link to="/products?category=Home%20Items" className="h-full flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative bg-white border border-gray-100 border-t-4 border-t-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-[#F4A261]/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-amber-50/50 rounded-xl sm:rounded-2xl shadow-inner border border-amber-100/60">
                                <img
                                    src={homeItems}
                                    alt="Home Items"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#F4A261] transition-colors">
                                    Home Items
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange home items.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap text-[#F4A261] bg-[#F4A261]/10 border border-[#F4A261]/30 group-hover:bg-[#F4A261] group-hover:text-white transition-all duration-300">
                                Explore Home Items &rarr;
                            </span>
                        </motion.div>
                    </Link>
                </div>
            </section>

            {/* Call To Action Banner */}
            <section className="w-[92%] max-w-6xl mx-auto my-10 md:my-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden bg-gradient-to-r from-[#2E7D32] via-[#256728] to-[#1E5621] rounded-3xl p-8 sm:p-14 text-white text-center shadow-xl shadow-[#2E7D32]/15 border border-emerald-600/30"
                >
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#F4A261]/15 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-emerald-100 border border-white/20 mb-3 shadow-xs">
                            Start Swapping Today
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                            Ready to declutter and find amazing products?
                        </h2>
                        <p className="mt-3 text-sm sm:text-lg text-emerald-100/90 font-medium leading-relaxed">
                            Join thousands of community members exchanging books, gadgets, games, and items every day.
                        </p>

                        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center font-bold text-[#2E7D32] px-6 sm:px-8 py-3 rounded-full bg-white hover:bg-emerald-50 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-xs sm:text-base"
                            >
                                <span>Browse Marketplace</span>
                            </Link>
                            <Link
                                to="/addProduct"
                                className="inline-flex items-center justify-center font-bold text-white px-6 sm:px-8 py-3 rounded-full bg-white/15 hover:bg-white hover:text-[#2E7D32] border border-white/40 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 text-xs sm:text-base"
                            >
                                <span>List Product</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;