import { useState, useEffect } from "react";
import { FaUserCircle, FaArrowLeft, FaCamera, FaTrash } from "react-icons/fa";
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
      console.log(error.response);
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

    // Max size 5MB
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size must be less than 5 MB");
    }

    setProfileImage(file);
    setShowPicker(false);
  };
  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 cursor-pointer mb-8"
          >
            <FaArrowLeft className="text-xl" />

            <h2 className="text-2xl font-bold">
              Profile
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">

            <div className="flex flex-col items-center">

              <div className="relative w-36 h-36 mx-auto">

                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    onClick={() => setShowPreview(true)}
                    className="w-full h-full rounded-full object-cover border-4 border-[#2E7D32]"
                  />
                ) : profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    onClick={() => setShowPreview(true)}
                    className="w-full h-full rounded-full object-cover border-4 border-[#2E7D32]"
                  />
                ) : (
                  <FaUserCircle
                    className="w-full h-full text-[#2E7D32]"
                    onClick={() => setShowPreview(true)}
                  />
                )}

                <div
                  onClick={() => setShowPicker(true)}
                  className="absolute bottom-1 right-1 bg-white text-[#2E7D32] p-3 rounded-full shadow-lg border cursor-pointer flex items-center justify-center"
                >
                  <FaCamera />
                </div>

              </div>

              {(profileImage || profile?.profileImage) && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex items-center gap-2 mt-4 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                  Remove Photo
                </button>
              )}

              <h1 className="text-3xl font-bold mt-5 text-center">
                {name.slice(0, 25)}
              </h1>

              <p className="text-gray-500 break-all text-center mt-1">
                {profile?.email}
              </p>
            </div>

            <div className="mt-10 space-y-5">
              <div className="border rounded-2xl p-4">
                <h3 className="text-sm text-gray-500 mb-2">
                  Full Name
                </h3>

                <input
                  type="text"
                  maxLength={25}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none text-lg font-semibold"
                />
              </div>

              <div className="border rounded-2xl p-4">
                <h3 className="text-sm text-gray-500 mb-2">
                  Email Address
                </h3>

                <p className="font-semibold break-all">
                  {profile?.email}
                </p>
              </div>

              <div className="border rounded-2xl p-4">
                <h3 className="text-sm text-gray-500 mb-2">
                  Phone Number
                </h3>

                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone(value);
                  }}
                  placeholder="Enter phone number"
                  className="w-full outline-none text-lg font-semibold"
                />
              </div>

              <div className="border rounded-2xl p-4">
                <h3 className="text-sm text-gray-500 mb-2">
                  Location
                </h3>
                <input
                  type="text"
                  maxLength={50}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full outline-none text-lg font-semibold text-black"
                />
              </div>
            </div>

            <button
              disabled={updating}
              onClick={handleUpdateProfile}
              className="w-full mt-8 bg-[#2E7D32] text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {updating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </section>

      {showPreview && (
        <div
          onClick={() => setShowPicker(false)}
          className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl rounded-t-3xl p-6"
          >
            <button type="button" onClick={() => setShowPreview(false)}>
              <FaArrowLeft className="text-2xl" />
            </button>

            <h2 className="text-xl font-semibold">
              Profile Photo
            </h2>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Preview"
                className="w-[320px] h-[320px] object-cover"
              />
            ) : profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Preview"
                className="w-[320px] h-[320px] object-cover"
              />
            ) : (
              <div className="w-[320px] h-[320px] flex items-center justify-center">
                <FaUserCircle className="text-[180px] text-[#2E7D32]" />
              </div>
            )}
          </div>
        </div>
      )}
      {showPicker && (
        <div
          onClick={() => setShowPicker(false)}
          className="fixed inset-0 bg-black/40 z-50 flex items-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full rounded-t-3xl p-6"
          >
            <h2 className="text-xl font-semibold text-center mb-6">
              Choose Photo
            </h2>

            <div className="space-y-4">

              {/* Camera */}
              <label
                className="max-w-xs mx-auto flex items-center justify-center bg-[#2E7D32] text-white py-3 rounded-xl cursor-pointer hover:bg-[#256728] transition"
              >
                📷 Camera

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* Gallery */}
              <label
                className="max-w-xs mx-auto flex items-center justify-center bg-[#2E7D32] text-white py-3 rounded-xl cursor-pointer hover:bg-[#256728] transition"
              >
                🖼 Gallery

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
              className="w-full mt-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;