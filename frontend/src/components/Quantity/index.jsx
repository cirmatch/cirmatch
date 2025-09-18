import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NumberBox = ({ quantity, setQuantity, unit, setUnit, unitFromListing, maxQuantity }) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  // Compute effective maxQuantity depending on unit
  const effectiveMax = (() => {
    if (!maxQuantity || !unitFromListing) return maxQuantity;
    if (unit === unitFromListing) return maxQuantity;
    // Convert units
    if (unitFromListing === "Mt" && unit === "Kg") return maxQuantity * 1000;
    if (unitFromListing === "Kg" && unit === "Mt") return maxQuantity / 1000;
    return maxQuantity;
  })();

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleChange = (e) => {
    let input = e.target.value;

    // Allow empty input
    if (input === "") {
      setInputValue("");
      setQuantity(0);
      return;
    }

    // Allow digits and one dot
    if (/^\d*\.?\d*$/.test(input)) {
      // Prevent more than 2 decimals
      const parts = input.split(".");
      if (parts[1] && parts[1].length > 2) return;

      // Check against effectiveMax while typing
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

  const increment = () => {
    const newVal = Math.min(quantity + 0.01, effectiveMax);
    setQuantity(parseFloat(newVal.toFixed(2)));
    setInputValue(parseFloat(newVal.toFixed(2)).toString());
  };

  const decrement = () => {
    const newVal = Math.max(quantity - 0.01, 0.01);
    setQuantity(parseFloat(newVal.toFixed(2)));
    setInputValue(parseFloat(newVal.toFixed(2)).toString());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="flex items-center space-x-2"
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={decrement}
        className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
      >
        –
      </motion.button>

      <motion.input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="border text-center rounded w-[70px] px-2 py-1"
        placeholder="0.00"
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={increment}
        className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
      >
        +
      </motion.button>

      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="border rounded-md px-3 py-1 text-gray-700"
      >
        <option value="Kg">Kg</option>
        <option value="Mt">Mt</option>
      </select>
    </motion.div>
  );
};

export default NumberBox;
