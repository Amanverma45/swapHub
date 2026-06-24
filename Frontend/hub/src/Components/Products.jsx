import books from "../assets/books.png";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "SSC GD Books",
      description: "Complete preparation books for SSC GD Exam."
    },
    {
      id: 2,
      name: "Redmi Note 12",
      description: "Good condition mobile available for swap."
    },
    {
      id: 3,
      name: "Laptop Bag",
      description: "Premium laptop bag with multiple compartments."
    },
    {
      id: 4,
      name: "Headphones",
      description: "Wireless headphones with clear sound quality."
    },
    {
      id: 5,
      name: "Gaming Mouse",
      description: "RGB gaming mouse for smooth performance."
    },
    {
      id: 6,
      name: "Smart Watch",
      description: "Fitness tracking and notification support."
    },
    {
      id: 7,
      name: "Programming Books",
      description: "JavaScript and React learning books.try fast..."
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      description: "Portable speaker with powerful sound. for home uses...."
    },
    {
      id: 9,
      name: "Keyboard",
      description: "Mechanical keyboard in good condition."
    }
  ];

  return (
    <section className="w-[90%] max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          Explore Products
        </h1>

        <p className="text-gray-600 mt-3">
          Browse products available for swapping.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={books}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-600 mt-3">
                {item.description}
              </p>

              <button className="mt-5 w-full bg-[#2E7D32] text-white py-3 rounded-full hover:bg-[#256728] transition">
                Send Swap Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;