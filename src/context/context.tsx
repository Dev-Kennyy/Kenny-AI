import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import main from "../config/gemni";

    // ---- Types ----
    interface ContextProviderProps {
    children: ReactNode;
    }

    interface ContextValue {
    prevPrompt: string[];
    setPrevPrompt: React.Dispatch<React.SetStateAction<string[]>>;
  onSent: (prompt?: string) => Promise<void>;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    recentPrompt: string;
    showResult: boolean;
    loading: boolean;
    resultData: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    newChat: () => void;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
    }

    // ---- Context Creation ----
const Context = createContext<ContextValue | null>(null);

    // ---- Provider ----
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem("kennyai.prevPrompts");
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch (error) {
      console.warn("Failed to parse stored prompts", error);
      return [];
    }
  });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 960;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        "kennyai.prevPrompts",
        JSON.stringify(prevPrompt.slice(-30))
      );
    } catch (error) {
      console.warn("Unable to persist prompts", error);
    }
  }, [prevPrompt]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 960);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const delayPara = useCallback((index: number, nextWord: string): void => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 60 * index);
  }, []);

  const newChat = useCallback((): void => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setRecentPrompt("");
    setInput("");
    setError(null);
  }, []);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 960) {
      setIsSidebarOpen(true);
      return;
    }
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 960) {
      setIsSidebarOpen(true);
      return;
    }
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const onSent = useCallback(
    async (incomingPrompt?: string): Promise<void> => {
      const finalPrompt = (incomingPrompt ?? input).trim();
      if (!finalPrompt) {
        setError("Please enter a prompt before sending.");
        return;
      }

      setError(null);
      setResultData("");
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(finalPrompt);
      setPrevPrompt((prev) =>
        prev.includes(finalPrompt) ? prev : [...prev, finalPrompt]
      );

      try {
        const response = await main(finalPrompt);

        if (!response) {
          throw new Error("Empty response from model");
        }

        const responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
          } else {
            newResponse += `<b>${responseArray[i]}</b>`;
          }
        }

        const newResponse2 = newResponse.split("*").join("</br>");
        const newResponseArray = newResponse2.split(" ");

        newResponseArray.forEach((nextWord, index) => {
          delayPara(index, `${nextWord} `);
        });
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
        setShowResult(false);
      } finally {
        setLoading(false);
        setInput("");
      }
    },
    [delayPara, input]
  );

  const contextValue: ContextValue = useMemo(
    () => ({
      prevPrompt,
      setPrevPrompt,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput,
      newChat,
      error,
      setError,
      isSidebarOpen,
      toggleSidebar,
      openSidebar,
      closeSidebar,
    }),
    [
      prevPrompt,
      setPrevPrompt,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput,
      newChat,
      error,
      setError,
      isSidebarOpen,
      toggleSidebar,
      openSidebar,
      closeSidebar,
    ]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

    // ---- Custom Hook (Fixes ESLint red underline) ----
    export const useAppContext = (): ContextValue => {
    const ctx = useContext(Context);
    if (!ctx)
        throw new Error("useAppContext must be used within ContextProvider");
    return ctx;
    };

    export { ContextProvider, Context };
    export default ContextProvider;
