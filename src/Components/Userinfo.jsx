// UserDetail.jsx
import React from 'react';
import { useLocation,Link } from 'react-router-dom';

const Userinfo = () => {
  const {state} = useLocation();
 const user=state.user;
// console.log(user)


  if (!user) {
    return <div>No user data found!</div>;
  }

  return (
    <div className="bg-white flex justify-center items-center p-10">
    <div className="bg-blue-500 shadow-lg rounded-lg p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">User Details</h1>

      <div className="mb-4">
        <label className="text-xl font-bold">Name:</label>
        <span className="text-lg text-white font-bold">{user.name}</span>
      </div>

      <div className="mb-4">
        <label className="text-xl font-bold">Email:</label>
        <span className="text-lg text-white font-bold">{user.email}</span>
      </div>

      <div className="mb-4">
        <label className="text-xl font-bold">Phone:</label>
        <span className="text-lg text-white font-bold">{user.phone}</span>
      </div>

      <div className="mb-4">
        <label className="text-xl font-bold">Address:</label>
        <span className="text-lg text-white font-bold">{user.address.street}, {user.address.city}</span>
      </div>

      <div className="mb-4">
        <label className="text-xl font-bold">Company:</label>
        <span className="text-lg text-white font-bold">{user.company.name}</span>
      </div>

      <div className="mb-4">
        <label className="text-xl font-bold">Website:</label>
        <span className="text-lg text-white font-bold">{user.website}</span>
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
          Back to Users
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Userinfo;
