import { Dispatch } from "react";

export type Rule = (value: string) => true | string;
export type Rules = Rule[];
export type FormControlItem = {
  key: string;
  value: boolean;
  callback: Dispatch<boolean>;
};
export type FormRulesContextType = {
  setFormControl: (
    key: string,
    value: boolean,
    callback?: VoidFunction
  ) => void;
  removeFormControl: (key: string) => void;
};
