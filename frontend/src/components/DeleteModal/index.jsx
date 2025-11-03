// components/common/DeleteModal.js
"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteModal = ({
  show,
  onClose,
  onConfirm,
  title = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Blurred background */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Modal content */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-lg w-96 p-6 flex flex-col items-center text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-xl font-semibold text-teal-600 mb-4">{title}</h2>
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
