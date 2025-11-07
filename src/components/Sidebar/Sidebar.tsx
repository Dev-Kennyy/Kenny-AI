import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useAppContext } from "../../context/context";
export const Sidebar = () => {
  const [extended, setExtended] = useState<boolean>(false);
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useAppContext();
    const loadPrompts = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={() =>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, number) => {
              return (
                <div className="recent-entry" onClick={() => loadPrompts(item)} key={number}>
                  <img src={assets.message_icon} alt="" />
                      <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};
