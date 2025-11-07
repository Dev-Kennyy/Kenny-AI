import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState, useCallback } from "react";
import { useAppContext } from "../../context/context";

export const Sidebar = () => {
  const [isExtended, setIsExtended] = useState<boolean>(true);
  const {
    onSent,
    prevPrompt,
    setRecentPrompt,
    newChat,
    closeSidebar,
    toggleSidebar,
    isSidebarOpen,
  } = useAppContext();

  const handleMenuClick = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 960) {
      toggleSidebar();
      return;
    }
    setIsExtended((prev) => !prev);
  }, [toggleSidebar]);

  const loadPrompts = useCallback(
    async (prompt: string) => {
      setRecentPrompt(prompt);
      try {
        await onSent(prompt);
      } catch (error) {
        console.error("Failed to load prompt", error);
      } finally {
        if (typeof window !== "undefined" && window.innerWidth < 960) {
          closeSidebar();
        }
      }
    },
    [closeSidebar, onSent, setRecentPrompt]
  );

  const handleNewChat = useCallback(() => {
    newChat();
    if (typeof window !== "undefined" && window.innerWidth < 960) {
      closeSidebar();
    }
  }, [closeSidebar, newChat]);

  return (
    <>
      <aside
        className="sidebar"
        data-open={isSidebarOpen}
        data-extended={isExtended}
      >
        <div className="top">
          <button
            type="button"
            onClick={handleMenuClick}
            className="menu"
            aria-label="Toggle sidebar"
          >
            <img src={assets.menu_icon} alt="" />
          </button>
          <button
            type="button"
            onClick={handleNewChat}
            className="new-chat"
          >
            <img src={assets.plus_icon} alt="" />
            {isExtended ? <span>New Chat</span> : null}
          </button>
          {isExtended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompt.length > 0 ? (
                prevPrompt
                  .slice()
                  .reverse()
                  .map((item, number) => (
                    <button
                      type="button"
                      className="recent-entry"
                      onClick={() => loadPrompts(item)}
                      key={number}
                    >
                      <img src={assets.message_icon} alt="" />
                      <span>{item.length > 42 ? `${item.slice(0, 39)}…` : item}</span>
                    </button>
                  ))
              ) : (
                <p className="recent-empty">No conversations yet</p>
              )}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <button type="button" className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {isExtended ? <span>Help</span> : null}
          </button>
          <button type="button" className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {isExtended ? <span>Activity</span> : null}
          </button>
          <button type="button" className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {isExtended ? <span>Settings</span> : null}
          </button>
        </div>
      </aside>
      {isSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}
    </>
  );
};
