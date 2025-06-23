import React from "react";

interface TaskbarProps {
  windowMinimized: boolean;
  onRestore: () => void;
  windowVisible?: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({
  windowMinimized,
  onRestore,
  windowVisible,
}) => (
  <div className="w-full fixed left-0 bottom-0 z-50 bg-[#cac6cb] border-t border-[#464147] h-10 flex items-center px-2">
    {windowVisible && (
      <button
        className="flex items-center px-3 py-1 bg-[#dadada] border border-[#464147] text-xs rounded shadow hover:bg-[#eaeaea] mr-2"
        onClick={onRestore}
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect
            x="4"
            y="6"
            width="16"
            height="12"
            rx="2"
            fill="#cac6cb"
            stroke="#464147"
          />
          <rect
            x="7"
            y="9"
            width="10"
            height="6"
            rx="1"
            fill="#dadada"
            stroke="#464147"
          />
        </svg>
        Kutsu(1)
      </button>
    )}
    {/* You can add more taskbar items here if needed */}
  </div>
);

export default Taskbar;
