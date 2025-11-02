import React, { useState, useEffect } from "react";

/**
 * NumberBox Component
 * Handles quantity input, increment/decrement, unit display/dropdown, and maxQuantity validation.
 */
const NumberBox = ({
  quantity,
  setQuantity,
  unit,
  setUnit,
  unitFromListing,
  maxQuantity,
  disabled = true, // if true, show dropdown; else show unit as text
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  // Compute effective max quantity depending on selected unit
  const effectiveMax = (() => {
    if (!maxQuantity || !unitFromListing) return maxQuantity;
    if (unit === unitFromListing) return maxQuantity;
    if (unitFromListing === "Mt" && unit === "Kg") return maxQuantity * 1000;
    if (unitFromListing === "Kg" && unit === "Mt") return maxQuantity / 1000;
    return maxQuantity;
  })();

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  // Handle manual input change
  const handleChange = (e) => {
    let input = e.target.value;

    if (input === "") {
      setInputValue("");
      setQuantity(0);
      return;
    }

    if (/^\d*\.?\d*$/.test(input)) {
      const parts = input.split(".");
      if (parts[1] && parts[1].length > 3) return; // max 3 decimals

      const parsed = parseFloat(input);
      if (!isNaN(parsed)) {
        if (parsed > effectiveMax) {
          setInputValue(effectiveMax.toString());
          setQuantity(effectiveMax);
        } else {
          setInputValue(input);
          setQuantity(parsed);
        }
      } else {
        setInputValue(input);
      }
    }
  };

  // Increment quantity by 1 (max 3 decimals)
  const increment = () => {
    const newVal = Math.min(quantity + 1, effectiveMax);
    const rounded = parseFloat(newVal.toFixed(3));
    setQuantity(rounded);
    setInputValue(rounded.toString());
  };

  // Decrement quantity by 1 (max 3 decimals)
  const decrement = () => {
    const newVal = Math.max(quantity - 1, 1);
    const rounded = parseFloat(newVal.toFixed(3));
    setQuantity(rounded);
    setInputValue(rounded.toString());
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Decrement Button */}
      <button
        onClick={decrement}
        className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
      >
        –
      </button>

      {/* Quantity Input */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="border text-center rounded w-[85px] px-2 py-1"
        placeholder="0.000"
      />

      {/* Increment Button */}
      <button
        onClick={increment}
        className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
      >
        +
      </button>

      {/* Unit: dropdown if disabled, else display */}
      {disabled ? (
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border rounded-md px-3 py-1 text-gray-700"
        >
          <option value="Kg">Kg</option>
          <option value="Mt">Mt</option>
        </select>
      ) : (
        <span className="px-3 py-1 border rounded-md text-gray-700">{unit}</span>
      )}
    </div>
  );
};

export default NumberBox;
