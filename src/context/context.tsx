    import {
    createContext,
    useState,
    useContext,
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
    onSent: (prompt: string) => Promise<void>;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    recentPrompt: string;
    showResult: boolean;
    loading: boolean;
    resultData: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    newChat: () => void;
    }

    // ---- Context Creation ----
    const Context = createContext<ContextValue | null>(null);

    // ---- Provider ----
    const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index: number, nextword: string): void => {
        setTimeout(() => {
        setResultData((prev) => prev + nextword);
        }, 75 * index);
    };

    const newChat = (): void => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt: string): Promise<void> => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        const finalPrompt = prompt || input;
        setRecentPrompt(finalPrompt);
        setPrevPrompt((prev) => [...prev, finalPrompt]);

        const response = await main(finalPrompt);

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

        for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue: ContextValue = {
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
    };

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
