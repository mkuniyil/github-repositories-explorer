import { createContext, ReactNode, useState } from "react";

export interface AppContextData {
  searchStr: string;
  onSearch: (value: string) => void;
}

export const AppContext = createContext<AppContextData | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [searchStr, setSearchStr] = useState<string>("");

  const onSearch = (value: string) => setSearchStr(value);

  return (
    <AppContext.Provider value={{ searchStr, onSearch }}>
      {children}
    </AppContext.Provider>
  );
};
