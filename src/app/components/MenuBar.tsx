import React from "react";

interface MenuBarProps {
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ openMenu, setOpenMenu }) => (
  <div className="border border-b-[#dadada]">
    <ul className="flex">
      <li className="relative p-1 first-letter:underline cursor-pointer select-none" onClick={() => setOpenMenu(openMenu === 'new' ? null : 'new')} tabIndex={0} onBlur={() => setOpenMenu(null)}>
        New
        {openMenu === 'new' && (
          <ul className="absolute left-0 top-full mt-1 bg-[#cac6cb] border border-[#464147] text-xs min-w-[100px] z-10">
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">File</li>
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">Folder</li>
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">Shortcut</li>
          </ul>
        )}
      </li>
      <li className="relative p-1 first-letter:underline cursor-pointer select-none" onClick={() => setOpenMenu(openMenu === 'options' ? null : 'options')} tabIndex={0} onBlur={() => setOpenMenu(null)}>
        Options
        {openMenu === 'options' && (
          <ul className="absolute left-0 top-full mt-1 bg-[#cac6cb] border border-[#464147] text-xs min-w-[120px] z-10">
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">Settings...</li>
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">Themes</li>
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">Control Panel</li>
          </ul>
        )}
      </li>
      <li className="relative p-1 first-letter:underline cursor-pointer select-none" onClick={() => setOpenMenu(openMenu === 'help' ? null : 'help')} tabIndex={0} onBlur={() => setOpenMenu(null)}>
        Help
        {openMenu === 'help' && (
          <ul className="absolute left-0 top-full mt-1 bg-[#cac6cb] border border-[#464147] text-xs min-w-[110px] z-10">
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">View Help</li>
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">About</li>
            <li className="px-2 py-1 hover:bg-[#dadada] cursor-pointer">Contact Support</li>
          </ul>
        )}
      </li>
    </ul>
  </div>
);

export default MenuBar;
