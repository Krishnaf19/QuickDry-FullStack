import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateAccountDetails,
  updateImage,
  updatePassword,
} from "../api/user.api";

function Profile() {
  const [user, setUser] = useState(null);

  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    userAddress: "",
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();

      setUser(response);

      setFormData({
        fullName: response?.fullName || "",
        email: response?.email || "",
        phoneNumber: response?.phoneNumber || "",
        userAddress: response?.userAddress || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateAccountDetails(formData);

      setEditProfile(false);

      fetchUser();

      alert("Profile Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (e) => {
    try {
      const image = e.target.files[0];

      const data = new FormData();

      data.append("image", image);

      await updateImage(data);

      fetchUser();

      alert("Image Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await updatePassword(password);

      setPassword("");

      setChangePassword(false);

      alert("Password Updated");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-28">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex flex-col md:flex-row gap-8">

          {/* Image */}

          <div className="text-center">

            <img
              src={user.image}
              alt={user.fullName}
              className="w-44 h-44 rounded-full object-cover border-4 border-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-5"
            />

          </div>

          {/* Details */}

          <div className="flex-1">

            {!editProfile ? (
              <>

                <h1 className="text-3xl font-bold">
                  {user.fullName}
                </h1>

                <p className="mt-3">
                  <b>Email :</b> {user.email}
                </p>

                <p className="mt-2">
                  <b>Phone :</b> {user.phoneNumber}
                </p>

                <p className="mt-2">
                  <b>Address :</b> {user.userAddress}
                </p>

                <button
                  onClick={() => setEditProfile(true)}
                  className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Edit Details
                </button>

              </>
            ) : (
              <div className="space-y-4">

                <input
                  className="w-full border rounded-lg p-3"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full border rounded-lg p-3"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full border rounded-lg p-3"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                />

                <textarea
                  className="w-full border rounded-lg p-3"
                  rows="3"
                  value={formData.userAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userAddress: e.target.value,
                    })
                  }
                />

                <div className="flex gap-3">

                  <button
                    onClick={handleProfileUpdate}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditProfile(false)}
                    className="bg-gray-500 text-white px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* Password */}

        <div className="mt-10 border-t pt-8">

          <button
            onClick={() => setChangePassword(!changePassword)}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Change Password
          </button>

          {changePassword && (

            <div className="mt-5 space-y-4">

              <input
                type="password"
                placeholder="New Password"
                className="w-full border rounded-lg p-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handlePasswordUpdate}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Update Password
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;