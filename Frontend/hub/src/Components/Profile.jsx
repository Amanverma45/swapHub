import { useRef, useState } from "react";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  return (
    <section className="min-h-screen bg-gray-100 py-6 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
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

          {/* Profile */}
          <div className="flex flex-col items-center">

            <div className="relative">

              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-[#2E7D32]"
                />
              ) : (
                <FaUserCircle className="text-[140px] text-[#2E7D32]" />
              )}

            </div>

            <button
              onClick={() => fileInputRef.current.click()}
              className="mt-3 text-[#2E7D32] hover:underline"
            >
              Edit Photo
            </button>
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={(e) => setProfileImage(e.target.files[0])}
            />

            <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-center">
              {user?.name?.slice(0, 25)}
            </h1>

            <p className="text-gray-500 break-all text-center">
              {user?.email}
            </p>

          </div>

          {/* Info */}
          <div className="mt-10 space-y-4">

            <div className="border rounded-2xl p-4">
              <h3 className="text-gray-500 text-sm">
                Full Name
              </h3>

              <p className="font-semibold">
                {user?.name}
              </p>
            </div>

            <div className="border rounded-2xl p-4">
              <h3 className="text-gray-500 text-sm">
                Email Address
              </h3>

              <p className="font-semibold break-all">
                {user?.email}
              </p>
            </div>

            <div className="border rounded-2xl p-4">
              <h3 className="text-gray-500 text-sm">
                Phone Number
              </h3>

              <p className="text-gray-400">
                Not Added
              </p>
            </div>

            <div className="border rounded-2xl p-4">
              <h3 className="text-gray-500 text-sm">
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
            Edit Profile
          </button>

        </div>

      </div>

    </section>
  );
};

export default Profile;