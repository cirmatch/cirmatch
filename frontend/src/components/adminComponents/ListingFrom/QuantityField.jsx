"use client";

import React from "react";

const QuantityField = ({ quantityValue, setQuantityValue, quantityUnit, setQuantityUnit, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Quantity</label>
      <div className="flex space-x-2">
        <input
          type="number"
          value={quantityValue}
          onChange={(e) => setQuantityValue(e.target.value)}
          placeholder="e.g., 50"
          className="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={quantityUnit}
          onChange={(e) => setQuantityUnit(e.target.value)}
          className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500"
        >
          <option value="Kg">Kg</option>
          <option value="Mt">Mt</option>
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default QuantityField;
