import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const MySwapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  const getMySwapRequests = async () => {
    try {
      const response = await axios.get("/mySwapRequests");

      setRequests(response.data);

      const count = response.data.filter(
        (item) =>
          item.status === "accepted" || item.status === "rejected"
      ).length;

      setNotificationCount(count);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMySwapRequests();
  }, []);

  return (
    <section className="w-[90%] max-w-7xl mx-auto py-16">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          My Swap Requests
        </h1>

        <p className="text-gray-600 mt-2">
          Track all swap requests you have sent.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
          🔔: {notificationCount}
        </p>
      </div>

      {loading ? (
        <h2 className="text-center text-xl">
          Loading...
        </h2>
      ) : requests.length === 0 ? (
        <h2 className="text-center text-xl">
          No Swap Requests Found
        </h2>
      ) : (
        <div className="space-y-8">

          {requests.map((request) => (

            <div
              key={request._id}
              className="bg-white rounded-3xl shadow-md border p-6"
            >

              {/* Header */}

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-2xl font-bold">
                    {request.receiver.name}
                  </h2>

                  <p className="text-gray-500">
                    {request.receiver.email}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2
                  ${request.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : request.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full
                    ${request.status === "accepted"
                        ? "bg-green-600"
                        : request.status === "rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                  ></span>

                  {request.status}
                </span>

              </div>

              {/* Products */}

              <div className="grid md:grid-cols-2 gap-8">

                {/* Requested Product */}

                <div className="border rounded-2xl p-4">

                  <h3 className="font-bold text-lg mb-4">
                    Requested Product
                  </h3>

                  <img
                    src={request.requestedProduct.image}
                    alt={request.requestedProduct.productName}
                    className="w-full h-52 object-cover rounded-xl"
                  />

                  <h4 className="text-xl font-semibold mt-4">
                    {request.requestedProduct.productName}
                  </h4>

                </div>

                {/* Offered Product */}

                <div className="border rounded-2xl p-4">

                  <h3 className="font-bold text-lg mb-4">
                    Your Product
                  </h3>

                  <img
                    src={request.offeredProduct.image}
                    alt={request.offeredProduct.productName}
                    className="w-full h-52 object-cover rounded-xl"
                  />

                  <h4 className="text-xl font-semibold mt-4">
                    {request.offeredProduct.productName}
                  </h4>

                </div>

              </div>

              <p className="text-sm text-gray-500 mt-6">
                Last Updated :{" "}
                {new Date(request.updatedAt).toLocaleString()}
              </p>

            </div>

          ))}

        </div>
      )}

    </section>
  );
};

export default MySwapRequests;