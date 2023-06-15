import { FC, useReducer } from 'react';
import { ModalContext, modalReducer } from './';

export interface ModalState {
  movieId?: string;
  isOpen: boolean;
}

const MODAL_INITIAL_STATE: ModalState = {
  isOpen: false,
};

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const ModalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, MODAL_INITIAL_STATE);

  const openModal = (movieId: string) => {
    dispatch({ type: '[Modal] - Open', payload: movieId });
  };

  const closeModal = () => {
    dispatch({ type: '[Modal] - Close' });
  };

  return (
    <ModalContext.Provider
      value={{
        ...state,

        // Methods

        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
