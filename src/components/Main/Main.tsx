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
        <p>Gemni</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>
                  Hey Champs, thank you for trusting KennyAI for assistant, i
                  will be able to help and give you insight so feel free
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Will you like to know more about the Developer of this AI
                  Application? It is good to know him
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Browse Kehinde Salimonu on LinkedIn, give him a follow and
                  endorse him. Thank you
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
                <img src={assets.send_icon} alt="" onClick={() => onSent(input)} />
              ) : (
                ""
              )}
            </div>
          </div>
          <p className="bottom-info">
            Sometimes, my insights and information may not be totally accurate.
            I am still in development stage
          </p>
        </div>
      </div>
    </div>
  );
};
