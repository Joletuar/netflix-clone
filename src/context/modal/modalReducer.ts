import { ModalState } from './';

type ModalActionType =
  | {
      type: '[Modal] - Open';
      payload: string;
    }
  | {
      type: '[Modal] - Close';
    };

export const modalReducer = (
  state: ModalState,
  action: ModalActionType
): ModalState => {
  switch (action.type) {
    case '[Modal] - Open':
      return {
        ...state,
        isOpen: true,
        movieId: action.payload,
      };

    case '[Modal] - Close':
      return {
        ...state,
        isOpen: false,
        movieId: undefined,
      };

    default:
      return state;
  }
};
