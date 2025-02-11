import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ResumeAnalysisData } from "../type";

type IAnalysisContext = {
  data: ResumeAnalysisData | null;
  handleAnalysis: (data: ResumeAnalysisData) => void;
  isLoading: boolean;
};

const AnalysisContext = createContext<IAnalysisContext | null>(null);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResumeAnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("analysis");
    if (storedAnalysis) {
      const parsedAnalysis = JSON.parse(storedAnalysis);
      setData(parsedAnalysis);
    }
    setIsLoading(false);
  }, []);

  const handleAnalysis = (data: ResumeAnalysisData) => {
    setData(data);
    const analysisString = JSON.stringify(data);
    localStorage.setItem("analysis", analysisString);
  };

  return (
    <AnalysisContext value={{ handleAnalysis, data, isLoading }}>
      {children}
    </AnalysisContext>
  );
};

export const useAnalysisContext = () => {
  const context = useContext(AnalysisContext);
  if (!context) throw new Error("Analysis Context cannot be empty");
  return context;
};
