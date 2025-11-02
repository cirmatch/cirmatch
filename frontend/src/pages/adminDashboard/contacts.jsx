"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiMail,
  FiX,
  FiCheckCircle,
  FiEdit,
  FiSend,
} from "react-icons/fi";
import AdminLayout from "@/layout/adminLayout/adminLayout";
import ErrorPage from "../404";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { getContact, replyContact } from "@/config/redux/action/contactAction";

/* ------------------- SearchBar Component ------------------- */
const SearchBar = ({ search, setSearch }) => (
  <div className="mb-6">
    <div className="flex w-full items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-12">
      <div className="px-3 text-gray-500">
        <FiMail size={22} />
      </div>
      <input
        type="text"
        placeholder="Search by contact detail or organization..."
        className="w-full bg-white px-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>
);

/* ------------------- Modal Wrapper with Blur ------------------- */
const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div className="fixed inset-0 backdrop-blur-md z-40" onClick={onClose} />
      {/* Modal box */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 z-50 border border-teal-500">
        {children}
      </div>
    </div>
  );
};

/* ------------------- View Modal ------------------- */
const ReplyModal = ({ isOpen, onClose, contact }) => {
  if (!contact) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-teal-600 flex items-center gap-2">
          <FiMail /> Contact Details
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 transition"
        >
          <FiX size={28} />
        </button>
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <span className="text-gray-500 font-semibold">Contact:</span>
          <p>{contact.ContactDetail}</p>
        </div>
        <div>
          <span className="text-gray-500 font-semibold">Organization:</span>
          <p>{contact.organization || "N/A"}</p>
        </div>
        <div>
          <span className="text-gray-500 font-semibold">Message:</span>
          <p className="break-words">{contact.message}</p>
        </div>
        <div>
          <span className="text-gray-500 font-semibold">Replied:</span>
          {contact.replied ? (
            <span className="text-green-600 font-medium flex items-center gap-1">
              <FiCheckCircle /> Yes
            </span>
          ) : (
            <span className="text-red-600 font-medium flex items-center gap-1">
              <FiX /> No
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
      >
        Close
      </button>
    </ModalWrapper>
  );
};

/* ------------------- Admin Reply Modal ------------------- */
const AdminReplyModal = ({ isOpen, onClose, contact }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!subject.trim()) return toast.error("Subject cannot be empty");
    if (!message.trim()) return toast.error("Message cannot be empty");

    try {
      await dispatch(
        replyContact({
          id: contact?._id,
          mail: contact?.ContactDetail,
          subject,
          message,
        })
      );

      toast.success("Reply sent successfully");
      setSubject("");
      setMessage("");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reply");
    }
  };

  if (!contact) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-teal-600 flex items-center gap-2">
          <FiEdit className="text-teal-600" /> Reply to Contact
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 transition"
        >
          <FiX size={28} />
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            className="w-full border border-teal-400 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            placeholder="Enter subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            className="w-full h-48 border border-teal-400 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none"
            placeholder="Type your reply message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSend}
        className="mt-6 w-full py-3 rounded-xl bg-teal-600 text-white font-semibold flex justify-center items-center gap-2 hover:bg-teal-700 transition"
      >
        <FiSend /> Send Reply
      </button>
    </ModalWrapper>
  );
};

/* ------------------- ContactTable Component ------------------- */
const ContactTable = ({ filteredContacts, handleView, handleReply }) => {
  if (filteredContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-gray-700 text-lg font-semibold mb-2">
          No Contacts Found
        </h2>
        <p className="text-gray-500 text-sm">
          Try searching by another contact detail or organization.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-teal-50 text-teal-700 border-b border-gray-200">
          <tr>
            {[
              "ID",
              "Contact Detail",
              "Organization",
              "Message",
              "Date",
              "Actions",
            ].map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => {
            const formattedDate = new Date(contact.createdAt).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }
            );

            return (
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
                  {formattedDate}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleView(contact)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition flex items-center gap-1"
                  >
                    <FiMail /> View
                  </button>
                  <button
                    onClick={() => handleReply(contact)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition flex items-center gap-1"
                  >
                    <FiEdit /> Reply
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


/* ------------------- Main ContactsPage Component ------------------- */
export default function ContactsPage() {
  const dispatch = useDispatch();
  const { AllContact, isLoading, isError, message } = useSelector(
    (state) => state.contact
  );

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  useEffect(() => {
    setContacts(AllContact || []);
  }, [AllContact]);

  const filteredContacts = contacts.filter((contact) => {
    const text = (
      contact.ContactDetail + (contact.organization || "")
    ).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const handleView = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleReply = (contact) => {
    setSelectedContact(contact);
    setReplyModalOpen(true);
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
            <SearchBar search={search} setSearch={setSearch} />
            <ContactTable
              filteredContacts={filteredContacts}
              handleView={handleView}
              handleReply={handleReply}
            />
            <ReplyModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              contact={selectedContact}
            />
            <AdminReplyModal
              isOpen={replyModalOpen}
              onClose={() => setReplyModalOpen(false)}
              contact={selectedContact}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}
