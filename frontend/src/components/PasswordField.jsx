import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormInput from "./FormInput";

const PasswordField = ({ label, name, value, setValue, placeholder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <FormInput
        label={label}
        name={name}
        type={visible ? "text" : "password"}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-3 top-9 text-gray-500"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

export default PasswordField;