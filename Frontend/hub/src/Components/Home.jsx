import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import books from "../assets/books.png";
import mobile from "../assets/mobile.png";
import electronics from "../assets/electronics.png";
import gaming from "../assets/gaming.png";
import accessories from "../assets/accessories.png";
import homeItems from "../assets/homeItems.png";
import { motion } from "framer-motion";
import { FaUpload, FaSearch, FaExchangeAlt, FaHandshake, } from "react-icons/fa";

const Home = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden bg-gray-50/50">

            <section className="w-[90%] max-w-6xl mx-auto min-h-[85vh] flex items-center justify-center py-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center text-left"
                    >
                        <span className="self-start inline-block bg-[#F4A261]/20 text-[#F4A261] px-4 py-2 rounded-full text-sm font-medium mb-4">
                            Smart Product Exchange Platform
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Exchange Products
                            <span className="text-[#2E7D32]"> Smarter</span>,
                            <br className="hidden lg:inline" /> Not Costlier.
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg mt-6 leading-8 max-w-xl">
                            Swap books, mobiles, gadgets and other useful products with
                            people around you. Give unused items a new life and discover
                            something valuable without spending money.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link to="/products" className="bg-[#2E7D32] text-white px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 transition text-center min-w-[150px]">
                                Explore Products
                            </Link>
                            <Link to="/register" className="border-2 border-[#2E7D32] text-[#2E7D32] px-7 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 hover:text-white transition text-center min-w-[150px]">
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
                            animate={{ y: [0, -12, 0] }}
                            transition={{
                                duration: 2.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-full max-w-[380px] md:max-w-[480px] lg:max-w-[520px] object-contain select-none"
                        />
                    </motion.div>
                </div>
            </section>
            {/* How SwapHub Works */}
            <section className="w-[92%] max-w-6xl mx-auto py-8 md:py-16">
                <div className="text-center mb-8 md:mb-14">
                    <span className="bg-emerald-100 text-[#2E7D32] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                        Simple 4-Step Process
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2.5">
                        How SwapHub Works
                    </h2>
                </div>

                {/* Mobile: 2x2 (grid-cols-2) | Desktop: 4-col (md:grid-cols-4) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
                    {/* Step 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative group bg-gradient-to-b from-white via-emerald-50/30 to-white border border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            01
                        </div>
                        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#2E7D32] to-emerald-500 text-white shadow-md shadow-emerald-600/20 group-hover:scale-110 transition-transform duration-300 mt-1 sm:mt-2 mb-2 sm:mb-4">
                            <FaUpload className="text-xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">
                                Upload Product
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2 leading-tight sm:leading-relaxed">
                                List unused items easily with details.
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
                        className="relative group bg-gradient-to-b from-white via-amber-50/30 to-white border border-amber-100 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            02
                        </div>
                        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#F4A261] to-amber-400 text-white shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300 mt-1 sm:mt-2 mb-2 sm:mb-4">
                            <FaSearch className="text-xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-[#F4A261] transition-colors">
                                Browse Products
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2 leading-tight sm:leading-relaxed">
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
                        className="relative group bg-gradient-to-b from-white via-teal-50/30 to-white border border-teal-100 shadow-sm hover:shadow-xl hover:shadow-teal-500/10 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            03
                        </div>
                        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-md shadow-teal-600/20 group-hover:scale-110 transition-transform duration-300 mt-1 sm:mt-2 mb-2 sm:mb-4">
                            <FaExchangeAlt className="text-xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                                Send Request
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2 leading-tight sm:leading-relaxed">
                                Offer your item with one click.
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
                        className="relative group bg-gradient-to-b from-white via-orange-50/30 to-white border border-orange-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-300"
                    >
                        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md">
                            04
                        </div>
                        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300 mt-1 sm:mt-2 mb-2 sm:mb-4">
                            <FaHandshake className="text-xl sm:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-base md:text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                                Complete Swap
                            </h3>
                            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2 leading-tight sm:leading-relaxed">
                                Meet and enjoy your new item.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="w-[92%] max-w-6xl mx-auto py-8 md:py-16">
                <div className="text-center mb-8 md:mb-14">
                    <span className="bg-emerald-100 text-[#2E7D32] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                        Curated Collections
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2.5">
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
                            className="group relative bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/10 hover:from-amber-500/20 hover:to-emerald-500/20 border border-amber-200/60 hover:border-emerald-400/60 shadow-md hover:shadow-2xl hover:shadow-emerald-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/80 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-white/60">
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

                            <span className="mt-2 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#2E7D32] group-hover:translate-x-1 transition-transform">
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
                            className="group relative bg-gradient-to-br from-blue-500/10 via-white to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-200/60 hover:border-blue-400/60 shadow-md hover:shadow-2xl hover:shadow-blue-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/80 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-white/60">
                                <img
                                    src={mobile}
                                    alt="Mobiles"
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    Mobiles
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange smartphones.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
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
                            className="group relative bg-gradient-to-br from-purple-500/10 via-white to-violet-500/10 hover:from-purple-500/20 hover:to-violet-500/20 border border-purple-200/60 hover:border-purple-400/60 shadow-md hover:shadow-2xl hover:shadow-purple-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/80 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-white/60">
                                <img
                                    src={electronics}
                                    alt="Electronics"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    Electronics
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange gadgets.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
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
                            className="group relative bg-gradient-to-br from-rose-500/10 via-white to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 border border-rose-200/60 hover:border-rose-400/60 shadow-md hover:shadow-2xl hover:shadow-rose-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/80 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-white/60">
                                <img
                                    src={gaming}
                                    alt="Gaming"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                                    Gaming
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Swap games & consoles.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform">
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
                            className="group relative bg-gradient-to-br from-orange-500/10 via-white to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 border border-orange-200/60 hover:border-orange-400/60 shadow-md hover:shadow-2xl hover:shadow-orange-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/80 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-white/60">
                                <img
                                    src={accessories}
                                    alt="Accessories"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                    Accessories
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange fashion & gear.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-orange-600 group-hover:translate-x-1 transition-transform">
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
                            className="group relative bg-gradient-to-br from-teal-500/10 via-white to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 border border-teal-200/60 hover:border-teal-400/60 shadow-md hover:shadow-2xl hover:shadow-teal-500/20 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col justify-between items-center text-center h-full min-h-[180px] sm:min-h-[220px] md:min-h-[250px] transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center p-1.5 sm:p-2 bg-white/80 rounded-xl sm:rounded-2xl shadow-inner backdrop-blur-sm border border-white/60">
                                <img
                                    src={homeItems}
                                    alt="Home Items"
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                                />
                            </div>

                            <div className="mt-2 sm:mt-4 text-center w-full">
                                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                    Home Items
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-tight sm:leading-relaxed">
                                    Exchange home items.
                                </p>
                            </div>

                            <span className="mt-2 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
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