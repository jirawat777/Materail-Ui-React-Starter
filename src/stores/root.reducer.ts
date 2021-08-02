import { combineReducers } from 'redux';
import authenReducer, { IAuthenState } from './authen/authen.reducer';
import generalReducer, { IGeneralState } from './general/general.reducer';
export const rootPersist = ['authenReducer', 'generalReducer'];
export const authPersist = ['authenReducer'];
export interface IStates {
    authenReducer: IAuthenState
    generalReducer: IGeneralState
}
const rootReducer = combineReducers({
    authenReducer,
    generalReducer
})
export default rootReducer