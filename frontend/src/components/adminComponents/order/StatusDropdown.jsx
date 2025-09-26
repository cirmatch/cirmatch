import { ORDER_STATUSES } from "@/Constants/orderStatuses";


export default function StatusDropdown({ status, onChange, disabled }) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`px-2 py-1 rounded-md text-sm font-medium text-teal-700 bg-teal-100 border-none focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
