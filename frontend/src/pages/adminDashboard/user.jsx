"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import Loading from "@/components/Loading";
import ErrorPage from "../404";


import { getUser, changeRole } from "@/config/redux/action/authAction";
import toast from "react-hot-toast";
import SearchBar from "@/components/adminComponents/SearchBar";
import Table from "@/components/adminComponents/Table";


export default function UsersPage() {
  const dispatch = useDispatch();
  const { allUser, isLoading, isError } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => { dispatch(getUser()); }, [dispatch]);
  useEffect(() => { setUsers(allUser || []); }, [allUser]);

  const filteredUsers = users.filter((user) =>
    (user.number || user.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleChangeRole = async (id, newRole) => {
    try {
      setUpdatingId(id);
      await dispatch(changeRole({ userId: id, role: newRole })).unwrap();
      setUsers(prev => prev.map(user => user._id === id ? { ...user, role: newRole } : user));
      toast.success(`User role changed to "${newRole}"`);
    } catch (error) {
      toast.error(error || "Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-teal-700">Users Management</h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-96"><Loading /></div>
        ) : isError ? (
          <ErrorPage code="500" message={"Failed to load users"} />
        ) : (
          <>
            <SearchBar search={search} setSearch={setSearch} placeholder="Search by number or email..." />
            <Table
              headers={["ID", "Name", "Identifier", "Role", "Created At"]}
              data={filteredUsers}
              renderRow={(user) => {
                const identifier = user.number || user.email || "N/A";
                return (
                  <tr key={user._id} className="border-t border-gray-100 hover:bg-teal-50 transition-colors duration-150">
                    <td className="px-4 py-2 font-mono text-gray-600">#{user._id.slice(-5)}</td>
                    <td className="px-4 py-2 text-teal-700 font-medium">{user.name}</td>
                    <td className="px-4 py-2 text-gray-600">{identifier}</td>
                    <td className="px-4 py-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleChangeRole(user._id, e.target.value)}
                        disabled={updatingId === user._id}
                        className={`px-2 py-1 rounded-md text-sm font-medium border border-teal-100 text-teal-700 bg-teal-50 focus:outline-none focus:ring-1 focus:ring-teal-400 ${updatingId === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {["user","admin"].map((role) => <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap">{formatDate(user.createdAt)}</td>
                  </tr>
                );
              }}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}
