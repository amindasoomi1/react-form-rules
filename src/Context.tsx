import { createContext, useContext } from "react";
import { FormRulesContextType } from "./types";

export const FormRulesContext = createContext<FormRulesContextType | null>(
  null
);
export const useFormRulesContext = () => {
  const context = useContext(FormRulesContext);
  if (!context) {
    throw new Error(
      "useFormRulesContext must be used within a FormRulesContext"
    );
  }
  return context;
};
