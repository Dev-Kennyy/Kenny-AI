import "./Main.css";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/context";
import {  useCallback, useMemo, type FormEvent } from "react";

const QUICK_ACTIONS = [
  {
    title: "Who is Kenny",
    description: 'I am a Creative Developer, i build Web Applications for individuals, companies and association',
    icon: assets.compass_icon,
  },
  {
    title: "Project",
    description:
      "This is actually built to enhance my expertise and interaction with a Third party API",
    icon: assets.bulb_icon,
  },
  {
    title: "Career & Community",
    description:
      "Hire me or Recommend me",
    icon: assets.message_icon,
  },
  {
    title: "Tech stack",
    description: "React • TypeScript • Vite • GenAI • Accessible design",
    icon: assets.code_icon,
  },
];

export const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    error,
    setError,
    toggleSidebar,
    isSidebarOpen,
    openSidebar,
  } = useAppContext();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await onSent();
    },
    [onSent]
  );

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const handleQuickAction = useCallback(
    (prompt: string) => {
      void onSent(prompt);
    },
    [onSent]
  );

  const handleMenuClick = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 960) {
      if (!isSidebarOpen) {
        openSidebar();
        return;
      }
      toggleSidebar();
      return;
    }
  }, [isSidebarOpen, openSidebar, toggleSidebar]);

  return (
    <div className="main">
      <header className="nav">
        <button
          type="button"
          className="nav-menu"
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          <img src={assets.menu_icon} alt="" />
        </button>
        <div className="nav-title">
          <p>KennyAI</p>
          <span>Your personal AI Assistant</span>
        </div>
        <img src={assets.user_icon} alt="KennyAI author" className="nav-avatar" />
      </header>
      <div className="main-container">
        {!showResult ? (
          <section className="hero">
            <div className="greet">
              <p>
                <span>Hello Dear,</span>
              </p>
              <p>Thanks for exploring KennyAI personal lab.</p>
              <p className="greet-sub">Feel free to use me and recommend me to everyone!</p>
            </div>
            <div className="cards">
              {QUICK_ACTIONS.map((card) => (
                <button
                  type="button"
                  key={card.title}
                  className="card"
                  onClick={() => handleQuickAction(card.title)}
                >
                  <div className="card-header">
                    <h3>{card.title}</h3>
                    <img src={card.icon} alt="" />
                  </div>
                  <p>{card.description}</p>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="result" aria-live="polite">
            <div className="result-title">
              <img src={assets.user_icon} alt="Prompt author" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {/* <img src={assets.gemini_icon} alt="KennyAI" /> */}
              {loading ? (
                <div className="loader" role="status" aria-label="Generating response">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </section>
        )}

        <footer className="main-bottom">
          <form className="search-box" onSubmit={handleSubmit}>
            <label htmlFor="prompt-input" className="sr-only">
              Enter a prompt for KennyAI
            </label>
            <input
              id="prompt-input"
              type="text"
              autoComplete="off"
              placeholder="Clear your doubts, ask me anything"
              onChange={(e) => {
                if (error) {
                  setError(null);
                }
                setInput(e.target.value);
              }}
              value={input}
              disabled={loading}
            />
            <div>
              {canSend && (
                <button type="submit" disabled={!canSend} aria-label="Send prompt">
                  <img src={assets.send_icon} alt="" />
                </button>
              )}
            </div>
          </form>
          {error && <p className="error-banner">{error}</p>}
          <div className="bottom-info">
            <p>
              Let’s stay in touch on {" "}
              <a
                href="https://linkedin.com/in/kehinde-salimonu-b7a956249/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>{" "}
              & {" "}
              <a
                href="mailto:kehindesalimonu1@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Email
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
