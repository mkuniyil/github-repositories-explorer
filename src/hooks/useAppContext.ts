import { useContext } from "react";
import { AppContext, AppContextData } from "../providers/AppProvider";

export const useAppContext = (): AppContextData => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("context must be used inside a provider");
  }

  return appContext;
};
