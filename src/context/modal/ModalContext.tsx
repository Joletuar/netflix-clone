import { createContext } from 'react';

export interface ContextProps {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext({} as ContextProps);
