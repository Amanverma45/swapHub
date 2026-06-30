import { useEffect, useState } from 'react'
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const SwapRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSwapRequests = async () => {
    try {
      const response = await axios.get("/getSwapRequest");
      setRequests(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSwapRequests();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
      {loading ? (
        <h2>Loading...</h2>
      ) : requests.length === 0 ? (
        <h2>No Swap Requests</h2>
      ) : (
        <pre>{JSON.stringify(requests, null, 2)}</pre>
      )}
    </div>
  );
};

export default SwapRequests;
