import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  //..
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [exchangeFor, setExchangeFor] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image && image.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB");
            return;
        }
        setUpdating(true);
        try {
            const formData = new FormData();

            if (image) {
                formData.append("image", image);
            }
            formData.append("productName", productName);
            formData.append("category", category);
            formData.append("exchangeFor", exchangeFor);
            formData.append("location", location);
            formData.append("description", description);

            const response = await axios.put(`/updateProduct/${id}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            console.log(response.data);
            toast.success("Product Updated Successfully");

            setImage(null);
            setProductName("");
            setCategory("");
            setExchangeFor("");
            setLocation("");
            setDescription("");
            navigate("/products");

        } catch (error) {
            console.log(error);

            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");

                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setUpdating(false);
        }
    };

    const getProduct = async () => {
        try {
            const response = await axios.get(`/getProduct/${id}`);

            setProductName(response.data.productName);
            setCategory(response.data.category);
            setExchangeFor(response.data.exchangeFor);
            setLocation(response.data.location);
            setDescription(response.data.description);

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProduct();
    }, []);
    if (loading) {
        return (
            <h2 className="text-center text-2xl mt-10">
                Loading...
            </h2>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2E7D32]">
                        Update Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update your product details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product Image */}
                    <div>
                        <label className="block font-medium mb-2">
                            Product Image
                        </label>

                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full border border-gray-300 rounded-xl p-3"
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block font-medium mb-2">
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-medium mb-2">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]">
                            <option value="">Select Category</option>
                            <option value="Books">Books</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Home Items">Home Items</option>
                        </select>
                    </div>

                    {/* Exchange For */}
                    <div>
                        <label className="block font-medium mb-2">
                            Exchange For
                        </label>

                        <input
                            value={exchangeFor}
                            onChange={(e) => setExchangeFor(e.target.value)}
                            type="text"
                            placeholder="Example: Laptop, Books, Mobile"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium mb-2">
                            Location
                        </label>

                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            placeholder="Enter your city"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32]"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                            placeholder="Describe your product..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#2E7D32]"
                        ></textarea>
                    </div>

                    <button disabled={updating} type="submit"
                        className="w-full bg-[#2E7D32] hover:bg-[#256728] text-white py-3 rounded-xl transition duration-300"
                    >
                        {updating ? "Updating..." : "Update Product"}
                    </button>

                </form>
            </div>
        </section>
    );
}
export default EditProduct
