// financeReducer.ts

import { IFinance } from "../interface/IFinance";

  
  interface FinanceState {
    month: number;
    year: number;
    finances: IFinance[]
  }
  
  const initialState: FinanceState = {
    month: new Date().getMonth() + 1, // Mes actual
    year: new Date().getFullYear(), // Año actual
    finances:[]
  };
  
  // Define las acciones que el reducer puede manejar
  type FinanceAction =
    | { type: 'SET_MONTH'; payload: number }
    | { type: 'SET_YEAR'; payload: number }
    | { type: 'SET_FINANCES'; payload: IFinance[] }; // `payload` es el ID del elemento
  
  // Reducer
  const financeReducer = (state = initialState, action: FinanceAction): FinanceState => {
    switch (action.type) {
      case 'SET_MONTH':
        return {
          ...state,
          month:  action.payload,
        };
      case 'SET_YEAR':
        return {
          ...state,
          year:  action.payload,
        };
      case 'SET_FINANCES':
        return {
          ...state,
          finances: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default financeReducer;
  