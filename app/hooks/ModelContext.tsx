"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModelComponent = ReactNode;

interface ModelContextType {
  setModel: (model: ModelComponent) => void;
  clearModel: () => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};

export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [model, setModel] = useState<ModelComponent>(null);

  const clearModel = () => {
    setModel(null);
  };

  return (
    <ModelContext.Provider value={{ setModel, clearModel }}>
      {children}
      {model}
    </ModelContext.Provider>
  );
};
