import { FC, ReactNode, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TEST_IDS } from "../../../constants";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button
        data-testid={TEST_IDS.ACCORDION}
        onClick={handleOnClick}
        className="w-full flex justify-between items-center rounded py-3 px-4 bg-gray-100 hover:bg-gray-200"
      >
        <div>{title}</div>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isOpen && <>{children}</>}
    </>
  );
};
