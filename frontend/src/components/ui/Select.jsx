import React from "react";

const Select = ({ value, onChange, children, className = "" }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </select>
  );
};

export const SelectItem = ({ value, children }) => {
  return (
    <option value={value}>
      {children}
    </option>
  );
};

export default Select;