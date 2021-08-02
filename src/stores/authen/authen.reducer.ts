import { IActionReducer } from 'src/services/action.reducer';
import { AuthenAction } from './authen.action';

export interface IAuthenState {
  isLoggedIn: boolean;
  token: string | undefined;
}
const AuthenState = {
  isLoggedIn: false, // true : ล็อกอินแล้ว
  token: undefined, //  token ที่ได้จากการ login
} as IAuthenState;

export default (state = AuthenState, e: IActionReducer) => {
  switch (e.type) {
    case AuthenAction.AUTHEN_LOGIN_S: {
      const token = e.payload.accessToken;
      return { ...state, isLoggedIn: true, token };
    }

    case AuthenAction.AUTHEN_LOGOUT_S: {
      return { ...state, ...AuthenState };
    }

    default: {
      return state;
    }
  }
};
