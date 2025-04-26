import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/demoAuthSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <button className="text-black bg-white border border-cyan-900 hover:cursor-pointer p-3 rounded-lg" onClick={handleLogout}> Logout</button>
      <div className="flex items-center gap-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          {/* <h2 className="text-2xl font-bold">{user.name}</h2> */}
          {/* <p className="text-gray-500">{user.bio}</p> */}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-gray-600 block text-sm font-medium">Email</label>
          {/* <p className="text-lg">{user.email}</p> */}
        </div>
        <div>
          <label className="text-gray-600 block text-sm font-medium">Location</label>
          {/* <p className="text-lg">{user.location}</p> */}
        </div>
        <div>
          <label className="text-gray-600 block text-sm font-medium">Interests</label>
          {/* <p className="text-lg">{user.interests}</p> */}
        </div>
      </div>

      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;