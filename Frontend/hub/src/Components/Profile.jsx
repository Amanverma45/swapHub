import { useState, useEffect } from "react";
import { FaUserCircle, FaArrowLeft, FaCamera, FaTrash, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get("/getProfile");
      setProfile(response.data);
      setName(response.data.name);
      setPhone(response.data.phone || "");
      setLocation(response.data.location || "");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (!name.trim()) {
        return toast.error("Name is required");
      }
      if (phone && !/^\d{10}$/.test(phone)) {
        return toast.error("Please enter a valid 10-digit phone number");
      }
      if (location.trim().length > 50) {
        return toast.error("Location cannot exceed 50 characters");
      }
      const isSameName = name.trim() === profile?.name;
      const isSamePhone = phone === (profile?.phone || "");
      const isSameLocation = location.trim() === (profile?.location || "");
      const isSameImage = !profileImage;

      if (
        isSameName &&
        isSamePhone &&
        isSameLocation &&
        isSameImage
      ) {
        return toast("No changes detected", {
          icon: "ℹ️",
        });
      }
      setUpdating(true);
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("phone", phone);
      formData.append("location", location.trim());

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.put("/updateProfile", formData);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setProfile(response.data.user);
      setProfileImage(null);
      toast.success(response.data.message);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to update profile"
      );

    } finally {
      setUpdating(false);
    }
  };

  const handlePreview = () => {
    if (profileImage || profile?.profileImage) {
      setShowPreview(true);
    } else {
      toast("Profile photo not available", {
        icon: "📷",
      });
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const response = await axios.put("/removeProfilePhoto");

      setProfileImage(null);
      setProfile(response.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success(response.data.message);

    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Unable to remove photo"
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return toast.error(
        "Only JPG, JPEG, PNG, AVIF and WEBP images are allowed"
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size must be less than 5 MB");
    }
    setProfileImage(file);
    setShowPicker(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (showPicker || showPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPicker, showPreview]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
        <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin shadow-md mb-3"></div>
        <p className="text-gray-600 font-bold text-sm tracking-wide">
          Loading Profile Details...
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen py-10 sm:py-16 px-4 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
        {/* Ambient Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F4A261]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative max-w-3xl mx-auto">
          {/* Back Navigation Bar */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1E5621] font-bold text-xs sm:text-sm bg-white/90 hover:bg-white px-4 py-2 rounded-full border border-gray-200/80 transition shadow-xs mb-6 cursor-pointer"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back</span>
          </button>

          {/* Glassmorphism Profile Container */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-950/10 border border-white/80 ring-1 ring-black/5 p-6 sm:p-10">

            {/* Profile Avatar Header */}
            <div className="flex flex-col items-center pb-8 border-b border-gray-100">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36">
                <div
                  onClick={handlePreview}
                  className="w-full h-full rounded-full overflow-hidden ring-4 ring-[#2E7D32]/25 p-1 bg-white shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-emerald-50 text-[#2E7D32] flex items-center justify-center">
                      <FaUserCircle className="w-full h-full p-1" />
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setShowPicker(true)}
                  className="absolute bottom-1 right-1 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] text-white p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition border-2 border-white"
                  title="Change Profile Photo"
                >
                  <FaCamera className="text-sm" />
                </div>
              </div>

              {(profileImage || profile?.profileImage) && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="mt-4 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-full border border-red-200/80 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FaTrash className="text-xs" />
                  <span>Remove Photo</span>
                </button>
              )}

              <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#2E7D32] via-[#236327] to-[#1E5621] bg-clip-text text-transparent mt-4 text-center tracking-tight">
                {name}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 font-medium text-center mt-1 break-all">
                {profile?.email}
              </p>
            </div>

            {/* Profile Input Form Fields */}
            <div className="mt-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    maxLength={25}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm font-semibold outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                  />
                </div>

                {/* Email (Read-Only) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Email Address
                    </label>
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                      <FaLock className="text-[9px]" /> Read Only
                    </span>
                  </div>
                  <input
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className="w-full bg-gray-100/80 border border-gray-200/80 rounded-2xl px-4 py-3.5 text-gray-500 text-sm font-semibold cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setPhone(value);
                    }}
                    placeholder="10-digit phone number"
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm font-semibold outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    City / Location
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm font-semibold outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                  />
                </div>
              </div>

              {/* Save Changes Button */}
              <button
                disabled={updating}
                onClick={handleUpdateProfile}
                className="w-full mt-4 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:shadow-[#2E7D32]/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                {updating ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Saving Changes...
                  </>
                ) : (
                  "Save Profile Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Full Preview Modal */}
      {showPreview && (
        <div
          onClick={() => setShowPreview(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl max-w-sm w-full border border-white/80 overflow-hidden text-center"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Profile Photo</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition font-bold"
              >
                ✕
              </button>
            </div>

            <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-md bg-gray-50 flex items-center justify-center border border-gray-100">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-[#2E7D32] p-4" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Photo Picker Modal */}
      {showPicker && (
        <div
          onClick={() => setShowPicker(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-xl w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80"
          >
            <h2 className="text-lg font-bold text-center text-gray-900 mb-6">
              Choose Profile Photo
            </h2>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#2E7D32]/30 p-0.5 shadow-md">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-[#2E7D32]" />
                )}
              </div>
            </div>

            <div className="space-y-3">
              {/* Camera */}
              <label className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#236327] text-white py-3.5 rounded-2xl font-bold text-sm transition cursor-pointer shadow-md shadow-[#2E7D32]/20">
                <span>📷 Take Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* Gallery */}
              <label className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-800 py-3.5 rounded-2xl font-bold text-sm transition cursor-pointer">
                <span>🖼 Choose From Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <button
              onClick={() => setShowPicker(false)}
              className="w-full mt-4 py-3 rounded-2xl border border-gray-200 text-gray-500 font-bold text-xs hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;