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
        <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden bg-gradient-to-b from-emerald-50/30 via-white to-emerald-50/20">

            {/* Hero Section */}
            <section className="w-[90%] max-w-6xl mx-auto min-h-[85vh] flex items-center justify-center py-10 md:py-16">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center text-left"
                    >
                        <span className="self-start inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-[#2E7D32] border border-[#2E7D32]/25 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
                            Smart Product Exchange Platform
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                            Exchange Products{" "}
                            <span className="bg-gradient-to-r from-[#2E7D32] via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Smarter
                            </span>,
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
                                className="bg-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#236327] hover:border-[#236327] text-white font-semibold px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#2E7D32]/25 text-center text-sm md:text-base min-w-[150px]"
                            >
                                Explore Products &rarr;
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white font-semibold px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 text-center text-sm md:text-base min-w-[150px] shadow-sm"
                            >
                                Join Now
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
                        <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-emerald-300/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

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
                            className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px] object-contain select-none drop-shadow-[0_20px_40px_rgba(46,125,50,0.22)]"
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
                        className="relative group bg-gradient-to-b from-white via-emerald-50/40 to-white border border-emerald-100 hover:border-[#2E7D32]/40 shadow-md hover:shadow-xl hover:shadow-emerald-500/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-[#2E7D32] to-emerald-600 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            01
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
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
                        className="relative group bg-gradient-to-b from-white via-amber-50/40 to-white border border-amber-100 hover:border-[#F4A261]/40 shadow-md hover:shadow-xl hover:shadow-amber-500/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-[#F4A261] to-amber-500 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            02
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#F4A261]/15 border border-[#F4A261]/30 text-[#F4A261] group-hover:bg-[#F4A261] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
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
                        className="relative group bg-gradient-to-b from-white via-teal-50/40 to-white border border-teal-100 hover:border-teal-400 shadow-md hover:shadow-xl hover:shadow-teal-500/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            03
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaExchangeAlt className="text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
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
                        className="relative group bg-gradient-to-b from-white via-emerald-50/40 to-white border border-emerald-100 hover:border-[#2E7D32]/40 shadow-md hover:shadow-xl hover:shadow-emerald-500/15 p-4 sm:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-[#2E7D32] to-emerald-600 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            04
                        </div>
                        <div className="p-3 sm:p-4 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300 mt-2 mb-3">
                            <FaHandshake className="text-2xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
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
            <section className="w-[92%] max-w-6xl mx-auto py-10 md:py-16">
                <div className="text-center mb-10 md:mb-14">
                    <span className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-[#2E7D32] border border-[#2E7D32]/25 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
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
                            className="group relative bg-gradient-to-br from-emerald-500/10 via-white to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-200/80 hover:border-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-emerald-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/90 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-emerald-100">
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

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
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
                            className="group relative bg-gradient-to-br from-teal-500/10 via-white to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border border-teal-200/80 hover:border-teal-600 shadow-md hover:shadow-2xl hover:shadow-teal-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/90 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-teal-100">
                                <img
                                    src={mobile}
                                    alt="Mobiles"
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                    Mobiles
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange smartphones.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-teal-700 bg-teal-500/10 border border-teal-500/30 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
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
                            className="group relative bg-gradient-to-br from-emerald-600/10 via-white to-emerald-400/10 hover:from-emerald-600/20 hover:to-emerald-400/20 border border-emerald-200/80 hover:border-emerald-500 shadow-md hover:shadow-2xl hover:shadow-emerald-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/90 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-emerald-100">
                                <img
                                    src={electronics}
                                    alt="Electronics"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                    Electronics
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange gadgets.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/30 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
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
                            className="group relative bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/10 hover:from-amber-500/20 hover:to-emerald-500/20 border border-amber-200/80 hover:border-[#F4A261] shadow-md hover:shadow-2xl hover:shadow-amber-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/90 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-amber-100">
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

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-[#F4A261] bg-[#F4A261]/10 border border-[#F4A261]/30 group-hover:bg-[#F4A261] group-hover:text-white transition-all duration-300">
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
                            className="group relative bg-gradient-to-br from-teal-600/10 via-white to-emerald-500/10 hover:from-teal-600/20 hover:to-emerald-500/20 border border-teal-200/80 hover:border-teal-600 shadow-md hover:shadow-2xl hover:shadow-teal-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/90 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-teal-100">
                                <img
                                    src={accessories}
                                    alt="Accessories"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                    Accessories
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange fashion & gear.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-teal-700 bg-teal-500/10 border border-teal-500/30 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
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
                            className="group relative bg-gradient-to-br from-emerald-500/10 via-white to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20 border border-emerald-200/80 hover:border-[#2E7D32] shadow-md hover:shadow-2xl hover:shadow-emerald-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/90 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-emerald-100">
                                <img
                                    src={homeItems}
                                    alt="Home Items"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors">
                                    Home Items
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange home items.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/30 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                                Explore Home Items &rarr;
                            </span>
                        </motion.div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;