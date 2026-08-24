import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaBoxOpen,
  FaExchangeAlt,
  FaFlag,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEye,
  FaSearch,
  FaShieldAlt,
  FaExclamationTriangle,
  FaUserShield,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("reports"); // 'reports' | 'users' | 'products'
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSwaps: 0,
    totalReports: 0,
    pendingReports: 0,
  });

  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Modals state
  const [userSearch, setUserSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedReportModal, setSelectedReportModal] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Fetch admin stats error:", err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get("/admin/reports");
      setReports(res.data || []);
    } catch (err) {
      console.error("Fetch reports error:", err);
      toast.error("Failed to load reports");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/admin/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchReports(), fetchUsers(), fetchProducts()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  // Update report status (Resolve / Reject)
  const handleUpdateReportStatus = async (reportId, status, deleteProduct = false) => {
    try {
      const res = await axios.put(`/admin/reports/${reportId}/status`, {
        status,
        deleteProduct,
      });

      toast.success(res.data.message || `Report marked as ${status}`);
      fetchReports();
      fetchStats();
      if (deleteProduct) fetchProducts();
      if (selectedReportModal?._id === reportId) {
        setSelectedReportModal(null);
      }
    } catch (err) {
      console.error("Update report error:", err);
      toast.error(err.response?.data?.message || "Failed to update report status");
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user and all their listings?")) return;
    try {
      const res = await axios.delete(`/admin/users/${userId}`);
      toast.success(res.data.message || "User deleted successfully");
      fetchUsers();
      fetchProducts();
      fetchStats();
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error("Failed to delete user");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`/admin/products/${productId}`);
      toast.success(res.data.message || "Product deleted successfully");
      fetchProducts();
      fetchStats();
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error("Failed to delete product");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredProducts = products.filter(
    (p) =>
      p.productName?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.location?.toLowerCase().includes(productSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-bold text-sm">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50/70 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-700/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <FaShieldAlt className="text-sm" /> Admin Control Center
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              SwapHub Portal
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
              Manage reported items, moderate listings, and oversee user accounts.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <FaUserShield className="text-emerald-400 text-xl" />
            <div className="text-xs">
              <p className="text-slate-400 font-medium">Logged in as Admin</p>
              <p className="font-bold text-white">amanarandiya@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Total Users */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2E7D32] flex items-center justify-center text-xl shrink-0 border border-emerald-100">
              <FaUsers />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Users</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">{stats.totalUsers}</h2>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0 border border-blue-100">
              <FaBoxOpen />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Products</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">{stats.totalProducts}</h2>
            </div>
          </div>

          {/* Total Swap Requests */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0 border border-amber-100">
              <FaExchangeAlt />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Swaps</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">{stats.totalSwaps}</h2>
            </div>
          </div>

          {/* Total Reports */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-xl shrink-0 border border-red-100">
                <FaFlag />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Reports</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">{stats.totalReports}</h2>
              </div>
            </div>
            {stats.pendingReports > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                {stats.pendingReports} Pending
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation Controls: 1, 2, 3 vertically stacked on mobile (flex-col), side-by-side on desktop (sm:flex-row) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-2.5 sm:gap-3 border-b border-gray-200 pb-3">
          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl sm:rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "reports"
                ? "bg-red-500 text-white shadow-md shadow-red-500/25 scale-[1.01] sm:scale-105"
                : "bg-white text-gray-700 border border-gray-200 hover:border-red-200 hover:text-red-500"
            }`}
          >
            <FaFlag className="text-xs shrink-0" />
            <span>1. Reports Management</span>
            {stats.pendingReports > 0 && (
              <span className="ml-1 bg-white text-red-600 px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">
                {stats.pendingReports}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl sm:rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "users"
                ? "bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/25 scale-[1.01] sm:scale-105"
                : "bg-white text-gray-700 border border-gray-200 hover:border-[#2E7D32]/30 hover:text-[#2E7D32]"
            }`}
          >
            <FaUsers className="text-xs shrink-0" />
            <span>2. Users List ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl sm:rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "products"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.01] sm:scale-105"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            <FaBoxOpen className="text-xs shrink-0" />
            <span>3. Products List ({products.length})</span>
          </button>
        </div>

        {/* Tab 1: Reports Management */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-between gap-2 border-b border-gray-100/80 pb-3">
              <h2 className="text-sm sm:text-lg font-extrabold text-gray-900 flex items-center gap-2 whitespace-nowrap">
                <span>🚨 User Reported Products</span>
              </h2>
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-bold whitespace-nowrap shrink-0">
                {reports.length} Total Reports
              </span>
            </div>

            {reports.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-gray-100 text-center shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#2E7D32] flex items-center justify-center text-3xl mx-auto mb-3">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Reported Products</h3>
                <p className="text-xs text-gray-500 mt-1">All marketplace listings are clean and report-free.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reports.map((r) => {
                  const prod = r.product || {};
                  const reporter = r.reporter || {};
                  const statusColors = {
                    Pending: "bg-amber-50 text-amber-700 border-amber-200",
                    Resolved: "bg-emerald-50 text-[#2E7D32] border-emerald-200",
                    Rejected: "bg-gray-100 text-gray-600 border-gray-200",
                  };

                  return (
                    <div
                      key={r._id}
                      className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition flex flex-col justify-between space-y-4 relative overflow-hidden"
                    >
                      {/* Top Bar: Status */}
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[r.status] || statusColors.Pending}`}>
                          Status: {r.status}
                        </span>
                        <span className="text-[11px] text-gray-400 font-semibold">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Reported Product Preview */}
                      <div className="flex items-center gap-3.5 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.productName || "Product"}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center text-xl text-gray-400 shrink-0">
                            📦
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold uppercase text-gray-400">{prod.category || "Item"}</span>
                          <h3 className="font-extrabold text-sm text-gray-900 truncate">
                            Reported Product: {prod.productName || "Deleted Product"}
                          </h3>
                          {prod.location && (
                            <p className="text-[11px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                              <FaLocationDot className="text-[#F4A261]" /> {prod.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Reporter Info & Reason */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 font-medium">Reported By:</span>
                          <span className="font-bold text-gray-900">{reporter.name || "Unknown"}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 font-medium">Reason:</span>
                          <span className="font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                            {r.reason}
                          </span>
                        </div>

                        {r.additionalDetails && (
                          <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-100 text-[11px] text-amber-900 italic">
                            "{r.additionalDetails}"
                          </div>
                        )}
                      </div>

                      {/* Admin Actions */}
                      <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedReportModal(r)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <FaEye className="text-xs" />
                          <span>View</span>
                        </button>

                        <button
                          disabled={r.status === "Resolved"}
                          onClick={() => handleUpdateReportStatus(r._id, "Resolved", true)}
                          className="flex-1 bg-[#2E7D32] hover:bg-[#236327] disabled:opacity-50 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <FaCheck className="text-xs" />
                          <span>Resolve</span>
                        </button>

                        <button
                          disabled={r.status === "Rejected"}
                          onClick={() => handleUpdateReportStatus(r._id, "Rejected", false)}
                          className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <FaTimes className="text-xs" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Users Management */}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-900">👥 All Registered Users</h2>
              <div className="relative w-full sm:w-72">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search user name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider font-bold">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        {u.profileImage ? (
                          <img src={u.profileImage} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold text-xs">
                            {u.name?.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="font-bold">{u.name}</span>
                      </td>
                      <td className="py-3.5 px-4">{u.email}</td>
                      <td className="py-3.5 px-4 text-gray-500">{u.phone || "N/A"}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.email === "amanarandiya@gmail.com" || u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-emerald-50 text-[#2E7D32]"
                        }`}>
                          {u.email === "amanarandiya@gmail.com" || u.role === "admin" ? "ADMIN" : "USER"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {u.email !== "amanarandiya@gmail.com" && (
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-3 py-1.5 rounded-xl transition text-xs font-bold cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Products Management */}
        {activeTab === "products" && (
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-900">📦 All Marketplace Products</h2>
              <div className="relative w-full sm:w-72">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search product title, location..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-xs font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <div key={p._id} className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between space-y-3">
                  <div className="relative h-32 rounded-xl overflow-hidden bg-gray-200">
                    <img src={p.image} alt={p.productName} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold text-[#2E7D32]">
                      {p.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900 truncate">{p.productName}</h3>
                    <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                      <FaLocationDot className="text-[#F4A261]" /> {p.location}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">Owner: {p.owner?.name || "Unknown"}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="w-full bg-red-50 hover:bg-red-500 text-red-600 hover:text-white py-2 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <FaTrash className="text-xs" />
                    <span>Delete Product</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Inspect Report Modal */}
      {selectedReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaFlag className="text-red-500" /> Report Details
              </h3>
              <button
                onClick={() => setSelectedReportModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-center gap-4">
                <img
                  src={selectedReportModal.product?.image}
                  alt="Product"
                  className="w-16 h-16 rounded-xl object-cover border border-gray-300"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">
                    Product: {selectedReportModal.product?.productName}
                  </h4>
                  <p className="text-gray-500 mt-0.5">Category: {selectedReportModal.product?.category}</p>
                  <p className="text-gray-500">Location: {selectedReportModal.product?.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-gray-400 font-medium block">Reported By:</span>
                  <span className="font-bold text-gray-900">{selectedReportModal.reporter?.name}</span>
                  <p className="text-gray-500">{selectedReportModal.reporter?.email}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Reason:</span>
                  <span className="font-extrabold text-red-600">{selectedReportModal.reason}</span>
                </div>
              </div>

              {selectedReportModal.additionalDetails && (
                <div>
                  <span className="font-bold text-gray-700 block mb-1">Additional Details:</span>
                  <p className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 font-medium">
                    {selectedReportModal.additionalDetails}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleUpdateReportStatus(selectedReportModal._id, "Resolved", true)}
                className="flex-1 bg-[#2E7D32] hover:bg-[#236327] text-white font-bold py-3 rounded-2xl text-xs shadow-md transition cursor-pointer"
              >
                ✅ Resolve & Remove Product
              </button>
              <button
                onClick={() => handleUpdateReportStatus(selectedReportModal._id, "Rejected", false)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition cursor-pointer"
              >
                ❌ Dismiss Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
