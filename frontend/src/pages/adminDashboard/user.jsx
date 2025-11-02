"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, getUser } from "@/config/redux/action/authAction";

import AdminLayout from "@/layout/adminLayout/adminLayout";
import ErrorPage from "../404";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

/* ------------------- SearchBar Component ------------------- */
const SearchBar = ({ search, setSearch }) => (
  <div className="mb-6">
    <div className="flex w-full items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-12">
      <div className="px-3 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search by number or email..."
        className="w-full bg-white px-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>
);

/* ------------------- UserTable Component ------------------- */
const UserTable = ({ filteredUsers, updatingId, handleChangeRole }) => {
  if (filteredUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-gray-700 text-lg font-semibold mb-2">
          No Users Found
        </h2>
        <p className="text-gray-500 text-sm">
          Try searching by another email or number.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-teal-50 text-teal-700 border-b border-gray-200">
          <tr>
            {["ID", "Name", "Identifier", "Role"].map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => {
            const identifier = user.number || user.email || "N/A";
            return (
              <tr
                key={user._id}
                className="border-t border-gray-100 hover:bg-teal-50 transition-colors duration-150"
              >
                <td className="px-4 py-2 font-mono text-gray-600">
                  #{user._id.slice(-5)}
                </td>
                <td className="px-4 py-2 text-teal-700 font-medium">
                  {user.name}
                </td>
                <td className="px-4 py-2 text-gray-600">{identifier}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user._id, e.target.value)}
                    disabled={updatingId === user._id}
                    className={`px-2 py-1 rounded-md text-sm font-medium border border-teal-100 text-teal-700 bg-teal-50 focus:outline-none focus:ring-1 focus:ring-teal-400 ${
                      updatingId === user._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {["user", "admin"].map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* ------------------- Main UsersPage Component ------------------- */
export default function UsersPage() {
  const dispatch = useDispatch();
  const { allUser, isLoading, isError } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all users on mount
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Update local users state
  useEffect(() => {
    setUsers(allUser || []);
  }, [allUser]);

  // Filter by number/email
  const filteredUsers = users.filter((user) => {
    const identifier = (user.number || user.email || "").toLowerCase();
    return identifier.includes(search.toLowerCase());
  });

  // Change user role
  const handleChangeRole = async (id, newRole) => {
    try {
      setUpdatingId(id);
      await dispatch(changeRole({ userId: id, role: newRole })).unwrap();

      // Update local UI immediately
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );

      toast.success(`User role changed to "${newRole}"`);
    } catch (error) {
      toast.error(error || "Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-teal-700">
          Users Management
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loading />
          </div>
        ) : isError ? (
          <ErrorPage code="500" message={"Failed to load users"} />
        ) : (
          <>
            <SearchBar search={search} setSearch={setSearch} />
            <UserTable
              filteredUsers={filteredUsers}
              updatingId={updatingId}
              handleChangeRole={handleChangeRole}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}
