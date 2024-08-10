import { FC } from "react";
import { TEST_IDS } from "../../../constants";

interface ButtonProps {
  text: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ text, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={TEST_IDS.BUTTON}
      className="rounded block bg-blue-400 text-gray-100 sm:text-sm w-full h-12 pt-3 pb-4 "
    >
      {text}
    </button>
  );
};
