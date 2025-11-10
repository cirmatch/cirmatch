"use client";

import React from "react";

const Table = ({ headers, data, renderRow }) => {
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-gray-700 text-lg font-semibold mb-2">No Data Found</h2>
        <p className="text-gray-500 text-sm">Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-teal-50 text-teal-700 border-b border-gray-200">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
