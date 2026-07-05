import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const MySwapRequests = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMySwapRequests = async () => {
    try {

      const response = await axios.get("/mySwapRequests");

      setRequests(response.data);

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
    <div className="min-h-screen flex items-center justify-center">

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <pre>{JSON.stringify(requests, null, 2)}</pre>
      )}

    </div>
  );
};

export default MySwapRequests;