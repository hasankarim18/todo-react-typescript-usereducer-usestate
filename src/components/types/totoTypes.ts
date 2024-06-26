import { ReactNode } from "react";

export type TodoProviderProps = {
  children: ReactNode;
};

export type TTodo = {
  id: string;
  title: string;
  isCompleted: boolean;
};
