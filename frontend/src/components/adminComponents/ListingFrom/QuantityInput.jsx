import React from "react";

const QuantityInput = ({ value, onChange, error }) => {
  // Split value into number and unit for input fields
  const [numberPart, unitPart] = value ? value.split(" ") : ["", "Kg"];

  const handleNumberChange = (num) => {
    onChange(`${num} ${unitPart}`);
  };

  const handleUnitChange = (unit) => {
    onChange(`${numberPart || 0} ${unit}`);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Quantity</label>
      <div className="flex space-x-2">
        <input
          type="number"
          value={numberPart}
          onChange={(e) => handleNumberChange(e.target.value)}
          placeholder="e.g., 50"
          className="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={unitPart}
          onChange={(e) => handleUnitChange(e.target.value)}
          className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        >
          <option value="Kg">Kg</option>
          <option value="Mt">Mt</option>
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message || error}</p>}
    </div>
  );
};

export default QuantityInput;
