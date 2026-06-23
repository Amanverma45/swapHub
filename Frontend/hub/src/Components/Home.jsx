import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import books from "../assets/books.png";
import mobile from "../assets/mobile.png";
import electronics from "../assets/electronics.png";
import gaming from "../assets/gaming.png";
import accessories from "../assets/accessories.png";
import homeItems from "../assets/homeItems.png";

const Home = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden bg-gray-50/50">

            <section className="w-[90%] max-w-6xl mx-auto min-h-[85vh] flex items-center justify-center py-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                    <div className="flex flex-col justify-center text-left">
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
                            <Link to="/products" className="bg-[#2E7D32] text-white px-7 py-3 rounded-full hover:bg-[#256728] transition text-center min-w-[150px]">
                                Explore Products
                            </Link>
                            <Link to="/register" className="border-2 border-[#2E7D32] text-[#2E7D32] px-7 py-3 rounded-full hover:bg-[#2E7D32] hover:text-white transition text-center min-w-[150px]">
                                Join Now
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="bg-white shadow-xl rounded-[40px] p-6 md:p-10 w-full max-w-[450px] aspect-square flex items-center justify-center">
                            <img src={logo} alt="SwapHub" className="w-full h-full object-contain max-h-[350px]" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-[90%] max-w-6xl mx-auto pt-16 pb-12 w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-center !mb-12 md:!mb-14">
                    How SwapHub Works
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-[#2E7D32] font-semibold text-xl mb-3">01</h3>
                        <p className="text-gray-700 font-medium">Upload your product</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-[#2E7D32] font-semibold text-xl mb-3">02</h3>
                        <p className="text-gray-700 font-medium">Browse available items</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-[#2E7D32] font-semibold text-xl mb-3">03</h3>
                        <p className="text-gray-700 font-medium">Send swap request</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-[#2E7D32] font-semibold text-xl mb-3">04</h3>
                        <p className="text-gray-700 font-medium">Exchange products</p>
                    </div>
                </div>
            </section>

            <div className="w-full h-16 md:h-28"></div>

            <section className="w-[90%] max-w-6xl mx-auto pt-12 pb-24 w-full">
                <h2 className="text-3xl md:text-4xl font-bold text-center !mb-12 md:!mb-14">
                    Popular Categories
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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