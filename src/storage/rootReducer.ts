// rootReducer.ts
import { combineReducers } from 'redux';
import financeReducer from './financeReducer';

const rootReducer = combineReducers({
  financeData: financeReducer, // Verifica que el nombre coincida
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
