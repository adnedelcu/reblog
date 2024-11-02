import { Key, Mail, Text } from "lucide-react";

export const TextInput = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="input input-bordered flex items-center gap-2">
        {type == 'email' && <Mail />}
        {type == 'password' && <Key />}
        {type == 'text' && <Text />}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-md px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-gray-700"
        />
      </label>
    </div>
  );
};
