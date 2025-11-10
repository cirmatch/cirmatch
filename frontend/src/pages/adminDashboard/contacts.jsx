"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import Loading from "@/components/Loading";
import ErrorPage from "../404";
import { deleteContact, getContact } from "@/config/redux/action/contactAction";
import SearchBar from "@/components/adminComponents/SearchBar";
import Table from "@/components/adminComponents/Table";
import ReplyModal from "@/components/adminComponents/ReplyModel";
import AdminReplyModal from "@/components/adminComponents/AdminReplyModel";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const { AllContact, isLoading, isError, message } = useSelector(
    (state) => state.contact
  );

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  useEffect(() => {
    setContacts(AllContact || []);
  }, [AllContact]);

  const filteredContacts = contacts.filter((contact) =>
    (contact.ContactDetail + (contact.organization || ""))
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleView = (contact) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  const handleReply = (contact) => {
    setSelectedContact(contact);
    setReplyModalOpen(true);
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteContact(selectedContact._id));
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete message");
    } finally {
      setDeleteModalOpen(false);
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
        <h1 className="text-3xl font-bold mb-6 text-teal-700">
          Contacts Management
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loading />
          </div>
        ) : isError ? (
          <ErrorPage
            code="500"
            message={message || "Failed to load contacts"}
          />
        ) : (
          <>
            <SearchBar
              search={search}
              setSearch={setSearch}
              placeholder="Search by contact detail or organization..."
            />
            <Table
              headers={[
                "ID",
                "Contact Detail",
                "Organization",
                "Message",
                "Date",
                "Actions",
              ]}
              data={filteredContacts}
              renderRow={(contact) => (
                <tr
                  key={contact._id}
                  className="border-t border-gray-100 hover:bg-teal-50 transition-colors duration-150"
                >
                  <td className="px-4 py-2 font-mono text-gray-600">
                    #{contact._id.slice(-5)}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {contact.ContactDetail}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {contact.organization || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-gray-600 truncate max-w-xs">
                    {contact.message}
                  </td>
                  <td className="px-4 py-2 text-gray-500 whitespace-nowrap">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleView(contact)}
                      className="px-3 py-1 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 flex items-center gap-1"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleReply(contact)}
                      className="px-3 py-1 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 flex items-center gap-1"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => handleDelete(contact)}
                      className="px-3 py-1 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-700 flex items-center gap-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            />
            <ReplyModal
              isOpen={viewModalOpen}
              onClose={() => setViewModalOpen(false)}
              contact={selectedContact}
            />
            <AdminReplyModal
              isOpen={replyModalOpen}
              onClose={() => setReplyModalOpen(false)}
              contact={selectedContact}
            />
            <DeleteModal
              show={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
              title="Do you really want to delete this message?"
              confirmText="Yes, Delete"
              cancelText="No, Cancel"
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}
