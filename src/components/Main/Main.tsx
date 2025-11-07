import "./Main.css";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/context";


export const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useAppContext();

  return (
    <div className="main">
      <div className="nav">
        <p>KennyAI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Dear,</span>
              </p>
              <p>Thank you for using KennyAI</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>
                  Hey Champs, thank you for trusting KennyAI for assistant, i
                  will be able to help and give you insight so feel free to use
                  me !
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Will you like to know more about the Developer of this AI
                  Application? I am Kehinde Salimonu, a Frontend Enthusiast.
                  Recommend me !
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Browse Kehinde Salimonu on LinkedIn, write your feedback give
                  me a follow and endorse me. Thank you
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Stack: React, TypeScript, Tailwind, AI</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter a prompt here"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>
              {/* <img src={assets.gallery_icon} alt="" /> */}
              {/* <img src={assets.mic_icon} alt="" /> */}
              {input ? (
                <img
                  src={assets.send_icon}
                  alt=""
                  onClick={() => onSent(input)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Give me a follow on{" "}
              <a href="linkedin.com/in/kehinde-salimonu-b7a956249/">LinkedIn</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
