// import {useState, useEffect } from "react";
import { useRef, useState, useEffect } from "react";
// import { FaUserCircle, FaArrowLeft,  FaTrash } from "react-icons/fa";
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

  const [profile, setProfile] = useState(null);

  const fileInputRef = useRef(null);

  const getProfile = async () => {
    try {
      const response = await axios.get("/getProfile");
      setProfile(response.data);
      setName(response.data.name);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const formData = new FormData();
      formData.append("name", name);
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

              <div className="relative">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    onClick={() => setShowPreview(true)}
                    className="w-36 h-36 rounded-full object-cover border-4 border-[#2E7D32] cursor-pointer"
                  />
                ) : profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    onClick={() => setShowPreview(true)}
                    className="w-36 h-36 rounded-full object-cover border-4 border-[#2E7D32] cursor-pointer"
                  />
                ) : (
                  <FaUserCircle onClick={() => setShowPreview(true)} className="text-[140px] text-[#2E7D32] cursor-pointer" />)}





                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  // style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfileImage(e.target.files[0]);
                    }
                  }}
                />

                <label
                  htmlFor="profile-image"
                  className="absolute bottom-1 right-1 z-10 bg-white text-[#2E7D32] p-3 rounded-full shadow-lg border cursor-pointer flex items-center justify-center"
                >
                  <FaCamera />
                  <input
                  // id="profile-image"
                  type="file"
                  // accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setProfileImage(e.target.files[0]);
                    }
                  }}

                // className="hidden"
                />
                </label>

                
                {/* <section className="p-10">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      console.log(e.target.files);
      alert("Selected");
    }}
  />
</section> */}




              </div>

              {(profileImage || profile?.profileImage) && (
                <button
                  type="button"
                  onClick={() => setProfileImage(null)}
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

                <p className="text-gray-400">
                  Not Added
                </p>
              </div>

              <div className="border rounded-2xl p-4">

                <h3 className="text-sm text-gray-500 mb-2">
                  Location
                </h3>

                <p className="text-gray-400">
                  Not Added
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpdateProfile}
              disabled={updating}
              className="w-full mt-8 bg-[#2E7D32] hover:bg-[#256728] text-white py-3 rounded-xl transition disabled:opacity-60"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </section>

      {showPreview && (
        <div
          onClick={() => setShowPreview(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-5"
        >
          <div
            className="absolute top-5 left-5 flex items-center gap-3 text-white"
            onClick={(e) => e.stopPropagation()}
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
    </>
  );
}

export default Profile;