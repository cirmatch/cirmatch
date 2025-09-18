import React from "react";

const SelectInput = ({ label, name, value, setValue, options, placeholder, error, register }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      {...(register ? register(name) : {})}
      value={!register ? value : undefined}
      onChange={!register ? (e) => setValue(e.target.value) : undefined}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error.message || error}</p>}
  </div>
);

export default SelectInput;
