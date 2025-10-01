"use client";
import React from "react";

const FormField = ({ label, type = "text", placeholder, value, onChange, options, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        >
          <option value="" disabled>Select {label}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type === "number" ? "number" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
