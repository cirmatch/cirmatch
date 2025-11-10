"use client";

import React from "react";
import { FiMail, FiX, FiCheckCircle } from "react-icons/fi";
import ModalWrapper from "./ModalWrapper";

const ReplyModal = ({ isOpen, onClose, contact }) => {
  if (!contact) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-teal-600 flex items-center gap-2">
          <FiMail /> Contact Details
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
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

export default ReplyModal;
