"use client";

import React, { ReactNode } from "react";
import { AnalysisProvider } from "./context/analysisContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <AnalysisProvider>{children}</AnalysisProvider>;
};

export default Providers;
