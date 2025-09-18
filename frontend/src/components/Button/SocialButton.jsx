
export const SocialButton = ({ icon, label }) => {
  return (
    <button className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(14,203,129,0.6)]">
      {icon}
      {label}
    </button>
  );
};
