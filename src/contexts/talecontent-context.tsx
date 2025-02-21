'use client';
import { createContext, useContext } from 'react';
import type { TaleContent } from '@/types';
interface TaleContentProps {
  children: React.ReactNode;
  content: TaleContent;
}
type TaleContentContext = TaleContent | null;
export const TaleContentContext = createContext<TaleContentContext>(null);

export default function TaleContentContextProvider({
  children,
  content,
}: TaleContentProps) {
  return (
    <TaleContentContext.Provider value={content}>
      {children}
    </TaleContentContext.Provider>
  );
}

export function useTaleContentContext() {
  const context = useContext(TaleContentContext);
  if (!context) {
    throw new Error(
      'useTaleContentContext must be used whitin a TaleContextProvider'
    );
  }
  return context;
}
