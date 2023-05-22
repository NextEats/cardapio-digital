import { ReactNode, createContext } from 'react';

interface iTeamContextProviderProps {
  children: ReactNode;
}

interface iTeamContextProvider {}

export const TeamContext = createContext({} as iTeamContextProvider);

export function TeamContextProvider({ children }: iTeamContextProviderProps) {
  return <TeamContext.Provider value={{}}>{children}</TeamContext.Provider>;
}
