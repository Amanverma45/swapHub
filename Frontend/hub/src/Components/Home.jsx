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

            <section className="w-[90%] max-w-6xl mx-auto pt-16 pb-12 w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-14 text-gray-800">
                    How SwapHub Works
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                            y: -6,
                            scale: 1.02,
                            boxShadow: "0 14px 30px rgba(0,0,0,0.12)"
                        }}
                        className="bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-center min-h-[220px] transition-all duration-200">

                        <FaUpload className="text-4xl md:text-5xl text-[#2E7D32] mx-auto mb-4" />

                        <h3 className="text-lg md:text-xl font-bold">
                            Upload Product
                        </h3>

                        <p className="text-xs md:text-sm text-gray-500 mt-3 leading-6">
                            List your unused product.
                        </p>

                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        whileHover={{
                            y: -6,
                            scale: 1.02,
                            boxShadow: "0 14px 30px rgba(0,0,0,0.12)"
                        }}
                        className="bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-center min-h-[220px] transition-all duration-200">
                        <FaSearch className="text-4xl md:text-5xl text-[#F4A261] mx-auto mb-4" />

                        <h3 className="text-lg md:text-xl font-bold">
                            Browse Products
                        </h3>

                        <p className="text-xs md:text-sm text-gray-500 mt-3 leading-6">
                            Discover products available for exchange.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{
                            y: -6,
                            scale: 1.02,
                            boxShadow: "0 14px 30px rgba(0,0,0,0.12)"
                        }}
                        className="bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-center min-h-[220px] transition-all duration-200">
                        <FaExchangeAlt className="text-4xl md:text-5xl text-[#2E7D32] mx-auto mb-4" />

                        <h3 className="text-lg md:text-xl font-bold">
                            Send Request
                        </h3>

                        <p className="text-xs md:text-sm text-gray-500 mt-3 leading-6">
                            Request an exchange with another user.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        whileHover={{
                            y: -6,
                            scale: 1.02,
                            boxShadow: "0 14px 30px rgba(0,0,0,0.12)"
                        }}
                        className="bg-white p-5 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-center min-h-[220px] transition-all duration-200">
                        <FaHandshake className="text-4xl md:text-5xl text-[#F4A261] mx-auto mb-4" />

                        <h3 className="text-lg md:text-xl font-bold">
                            Complete Swap
                        </h3>

                        <p className="text-xs md:text-sm text-gray-500 mt-3 leading-6">
                            Meet, exchange products and enjoy your new item.
                        </p>
                    </motion.div>
                </div>
            </section>


            <section className="w-[90%] max-w-6xl mx-auto pt-12 pb-24 w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 md:mb-14">
                    Popular Categories
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 hover:shadow-lg transition duration-300">
                        <img src={books} alt="Books" className="w-20 h-20 mx-auto mb-5 object-contain" />
                        <h3 className="text-xl font-semibold">Books</h3>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 hover:shadow-lg transition duration-300">
                        <img src={mobile} alt="Mobile" className="w-20 h-20 mx-auto mb-5 object-contain" />
                        <h3 className="text-xl font-semibold">Mobiles</h3>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 hover:shadow-lg transition duration-300">
                        <img src={electronics} alt="Electronics" className="w-20 h-20 mx-auto mb-5 object-contain" />
                        <h3 className="text-xl font-semibold">Electronics</h3>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 hover:shadow-lg transition duration-300">
                        <img src={gaming} alt="Gaming" className="w-20 h-20 mx-auto mb-5 object-contain" />
                        <h3 className="text-xl font-semibold">Gaming</h3>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 hover:shadow-lg transition duration-300">
                        <img src={accessories} alt="Accessories" className="w-20 h-20 mx-auto mb-5 object-contain" />
                        <h3 className="text-xl font-semibold">Accessories</h3>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 hover:shadow-lg transition duration-300">
                        <img src={homeItems} alt="Home Items" className="w-20 h-20 mx-auto mb-5 object-contain" />
                        <h3 className="text-xl font-semibold">Home Items</h3>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;