"use client";

import React, { useState } from "react";
import { FiEdit, FiSend, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { replyContact } from "@/config/redux/action/contactAction";
import toast from "react-hot-toast";
import ModalWrapper from "./ModalWrapper";

const AdminReplyModal = ({ isOpen, onClose, contact }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!subject.trim()) return toast.error("Subject cannot be empty");
    if (!message.trim()) return toast.error("Message cannot be empty");

    try {
      await dispatch(replyContact({ id: contact?._id, mail: contact?.ContactDetail, subject, message }));
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
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
          <FiX size={28} />
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Subject</label>
          <input
            type="text"
            className="w-full border border-teal-400 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            placeholder="Enter subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
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

export default AdminReplyModal;
