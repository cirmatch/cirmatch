import React from "react";

const TextInput = ({ label, name, value, setValue, placeholder, error, type = "text", register }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        {...(register ? register(name) : {})}
        value={!register ? value : undefined}
        onChange={!register ? (e) => setValue(e.target.value) : undefined}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        rows={4}
      />
    ) : (
      <input
        {...(register ? register(name) : {})}
        value={!register ? value : undefined}
        onChange={!register ? (e) => setValue(e.target.value) : undefined}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
      />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error.message || error}</p>}
  </div>
);

export default TextInput;
