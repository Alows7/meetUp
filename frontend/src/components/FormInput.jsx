const FormInput = ({ label, type, name, value, setValue }) => {
  return (
    <div className="mb-4 mt-1.5">
      <label className= "block " htmlFor={name}>{label}</label>
      <input
       className= " input w-full rounded-xl border border-gray-300 focus:outline-none focus:border-mint"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default FormInput;
