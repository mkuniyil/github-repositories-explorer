import { ChangeEvent, FC } from "react";
import { TEST_IDS } from "../../../constants";

interface InputProps {
  value: string;
  placeholder: string;
  required: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({
  value,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <div className="relative w-full text-gray-400 focus-within:text-gray-600 border shadow rounded-md">
      <input
        data-testid={TEST_IDS.INPUT}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="rounded border-2 block w-full h-12 pl-9 py-4 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
      />
    </div>
  );
};
