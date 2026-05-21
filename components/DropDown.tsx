"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";

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
  Trigger: React.FC<{ children: ReactNode; className?: string }>;
  Menu: React.FC<{ children: ReactNode; className?: string }>;
  Item: React.FC<{
    children: ReactNode;
    onClick?: () => void;
    active?: boolean;
  }>;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={ref} className="relative inline-block w-full">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
DropDown.displayName = "DropDown";

// ---------------- Trigger ----------------
const Trigger: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { toggle, isOpen } = useDropdown();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={isOpen}
      className={`inline-flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-neutral-800 shadow-sm transition-colors hover:border-neutral-400 focus:border-customOrange focus:outline-none focus:ring-2 focus:ring-customOrange/30 ${className ?? ""}`}
    >
      <span className="flex-1 text-left truncate">{children}</span>
      <ChevronDown
        size={16}
        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
};
Trigger.displayName = "DropDown.Trigger";

// ---------------- Menu ----------------
const Menu: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { isOpen } = useDropdown();

  return (
    <div
      role="menu"
      className={`absolute z-50 mt-2 min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl
        origin-top transform transition-all duration-200 ease-out
        ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  );
};
Menu.displayName = "DropDown.Menu";

// ---------------- Item ----------------
const Item: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
}> = ({ children, onClick, active }) => {
  const { close } = useDropdown();

  const handleClick = () => {
    if (onClick) onClick();
    close();
  };

  return (
    <div
      role="menuitem"
      onClick={handleClick}
      className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-customOrange/10 font-medium text-customOrange"
          : "text-neutral-800 hover:bg-gray-100"
      }`}
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
