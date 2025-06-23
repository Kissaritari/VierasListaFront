import React from "react";
import MenuBar from "./MenuBar";

interface WindowProps {
  windowMinimized: boolean;
  windowMaximized: boolean;
  setWindowMinimized: (min: boolean) => void;
  setWindowMaximized: (max: (m: boolean) => boolean) => void;
  setWindowVisible: (v: boolean) => void;
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  windowMinimized,
  windowMaximized,
  setWindowMinimized,
  setWindowMaximized,
  setWindowVisible,
  openMenu,
  setOpenMenu,
  children,
}) => {
  if (windowMinimized) return null;
  return (
    <div
      className={
        windowMaximized
          ? 'fixed inset-0 z-50 w-full h-full flex items-center justify-center my-0 mx-0 px-0'
          : 'w-full max-w-lg my-12 mx-auto px-2'
      }
    >
      <div className={
        'mx-auto bg-[#cac6cb] text-[#464147] text-sm border border-white border-b-[#464147] border-r-[#464147]' +
        (windowMaximized ? ' w-full h-full max-w-none max-h-none' : ' max-w-lg')
      }>
        <div className="flex flex-row items-center justify-between p-1 bg-gradient-to-r from-[#00007b] to-[#0884ce]">
          <h1 className="text-white">Kutsu(1)</h1>
          <div className="flex items-center space-x-0.5">
            {/* Minimize */}
            <button
              type="button"
              aria-label="Minimize"
              onClick={() => setWindowMinimized(true)}
              className="flex items-center justify-center px-0.5 w-4 h-4 bg-[#cac6cb] border border-white border-b-black border-r-black"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M480 480H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </button>
            {/* Maximize/Restore */}
            <button
              type="button"
              aria-label={windowMaximized ? 'Restore' : 'Maximize'}
              onClick={() => {
                setWindowMaximized((m) => !m);
                setWindowMinimized(false);
              }}
              className="flex items-center justify-center w-4 h-4 bg-[#cac6cb] border border-white border-b-black border-r-black"
            >
              {windowMaximized ? (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="7" width="10" height="10" stroke="#000" fill="none" strokeWidth="2"/>
                  <rect x="5" y="5" width="10" height="10" stroke="#000" fill="none" strokeWidth="1"/>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 21h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2V7h16l.001 12H4z"></path>
                </svg>
              )}
            </button>
            {/* Close */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setWindowVisible(false)}
              className="flex items-center justify-center w-4 h-4 bg-[#cac6cb] border border-white border-b-black border-r-black"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  d="M7,7 L17,17 M7,17 L17,7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <MenuBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <div className="space-y-0.5 bg-[#808080]">
          <div className=" bg-[#cac6cb] ">
            <div className="flex flex-col mt-2 space-y-3 mx-2 pb-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Window;
