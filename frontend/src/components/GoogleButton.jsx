import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ label }) => {
  return (
    <button
      type="button"
      className="w-full cursor-pointer py-3 rounded-xl border border-gray-300 bg-white flex items-center justify-center gap-2.5 font-bold text-sm text-ink mt-3"
    >
      <FcGoogle size={18} />
      {label}
    </button>
  );
};

export default GoogleButton
