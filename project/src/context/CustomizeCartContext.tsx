import React, { createContext, useContext, useState, ReactNode } from "react";

export interface OptionChoice {
  key: string;
  value: boolean;
  price: number;
  isPresent: boolean;
}

export interface CustomizationOption {
  title: string;
  choices: OptionChoice[];
}

export interface SizeOption {
  type: string;
  price: number;
}

export interface Customize {
  size: SizeOption[];
  name: string;
  itemId: string;
  options: CustomizationOption[];
}

interface CustomizeContextType {
  currentCustomize: Customize | null;
  updateCustomize: (id: string, dto: Customize) => void;
  clearCustomize: (id: string) => void;
}

const CustomizeContext = createContext<CustomizeContextType | undefined>(undefined);

export const CustomizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCustomize, setCurrentCustomize] = useState<Customize | null>(null);

  const createCustomize = (dto: Customize) => {
    setCurrentCustomize(dto);
  };

  const updateCustomize = (id: string, dto: Customize) => {
    if (currentCustomize && currentCustomize.itemId === id) {
      setCurrentCustomize(dto);
    }
  };

  const clearCustomize = (id: string) => {
    if (currentCustomize?.itemId === id) {
      setCurrentCustomize(null);
    }
  };

  return (
    <CustomizeContext.Provider
      value={{
        currentCustomize,
        updateCustomize,
        clearCustomize,
      }}
    >
      {children}
    </CustomizeContext.Provider>
  );
};

export const useCustomize = () => {
  const context = useContext(CustomizeContext);
  if (!context) {
    throw new Error("useCustomize must be used within CustomizeProvider");
  }
  return context;
};