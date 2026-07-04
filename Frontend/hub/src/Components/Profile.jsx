import { useRef, useState } from "react";
import { FaUserCircle, FaArrowLeft, FaCamera, FaTrash, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);

  return (
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
                  className="w-36 h-36 rounded-full object-cover border-4 border-[#2E7D32]"
                />
              ) : user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-[#2E7D32]"
                />
              ) : (
                <FaUserCircle className="text-[140px] text-[#2E7D32]" />
              )}

              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 bg-[#2E7D32] text-white p-3 rounded-full shadow-lg hover:bg-[#256728]"
              >
                <FaCamera />
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={(e) => setProfileImage(e.target.files[0])}
            />

            {profileImage && (
              <button
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
              {user?.email}
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
                {user?.email}
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
            className="w-full mt-8 bg-[#2E7D32] hover:bg-[#256728] text-white py-3 rounded-xl transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;