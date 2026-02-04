"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error("Dropdown components must be used within <DropDown />");
  return context;
};

interface DropDownProps {
  children: ReactNode;
}

const DropDown: React.FC<DropDownProps> & {
  Trigger: React.FC<{ children: ReactNode }>;
  Menu: React.FC<{ children: ReactNode }>;
  Item: React.FC<{ children: ReactNode; onClick?: () => void }>;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};
DropDown.displayName = "DropDown";

// ---------------- Trigger ----------------
const Trigger: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { toggle } = useDropdown();
  return (
    <button
      onClick={toggle}
      className={`${className} px-4 py-2 bg-gray-700 text-white rounded`}
    >
      {children}
    </button>
  );
};
Trigger.displayName = "DropDown.Trigger";

// ---------------- Menu ----------------
const Menu: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen } = useDropdown();

  return (
    <div
      className={`absolute mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50
        transition-all duration-200 ease-out
        transform origin-top
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
    >
      {children}
    </div>
  );
};
Menu.displayName = "DropDown.Menu";

// ---------------- Item ----------------
const Item: React.FC<{ children: ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => {
  const { close } = useDropdown();

  const handleClick = () => {
    if (onClick) onClick();
    close();
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
};
Item.displayName = "DropDown.Item";

// Attach compound components **before export**
DropDown.Trigger = Trigger;
DropDown.Menu = Menu;
DropDown.Item = Item;

export default DropDown;
