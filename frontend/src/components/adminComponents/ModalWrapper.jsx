"use client";

import React from "react";

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

export default ModalWrapper;
