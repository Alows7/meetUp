const AuthTabs = ({ active, onChange }) => {
  return (
    <div className="flex rounded-full bg-gray-200 p-1 w-full">
      <button
        type="button"
        onClick={() => onChange("login")}
        className={
          active === "login"
            ? "flex-1 rounded-full bg-white py-2 font-bold"
            : "flex-1 py-2 text-gray-500 cursor-pointer"
        }
      >
        Connexion
      </button>
      <button
        type="button"
        onClick={() => onChange("register")}
        className={
          active === "register"
            ? "flex-1 rounded-full bg-white py-2 font-bold"
            : "flex-1 py-2 text-gray-500 cursor-pointer"
        }
      >
        Inscription
      </button>
    </div>
  );
};

export default AuthTabs;
