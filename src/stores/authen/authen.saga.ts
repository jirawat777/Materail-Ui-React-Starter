import { takeLatest, put } from 'redux-saga/effects';
// import { Types as TypesAccount } from 'src/stores/account/account.action';
import authService from 'src/services/auth.service';
import { IActionSaga } from 'src/services/action.saga';
import { AuthenAction } from './authen.action';
import { callPost, callGet } from 'src/services/call-api';
import { ActionReducer } from 'src/services/action.reducer';
import { GeneralAction } from '../general/general.action';

const host = `${process.env.REACT_APP_API_AUTHEN_HOST}`;

function* authenLoginR(e: IActionSaga) {
  const { user_id, password } = e.payload;
  try {
    const { accessToken , info } = yield callPost(`${host}/api/v1/admin/authen/login`, {
      username: user_id,
      password,
    }) || {};

    yield put(ActionReducer({ type: GeneralAction.GENERAL_TOKEN_S, payload: { info } }));
    yield put(ActionReducer({ type: AuthenAction.AUTHEN_LOGIN_S, payload: { accessToken } }));

    authService.setAuthorization(accessToken);

    e.onSuccess();
  } catch (err) {
    e.onFailure(err);
    // yield put(ActionReducer({ type: AuthenAction.AUTHEN_LOGIN_S }));
  }
}

function* authenLogoutR(e: IActionSaga) {
  // const { force } = e.payload;
  try {
    // yield delay(500);
    // if (force !== true) {
    //   yield callPost(`${host}/v1/auth/logout`);
    // }
    // ลบ Authorization ใน Axios
    authService.delAuthorization();

    // Clear reducer
    yield put(ActionReducer({ type: GeneralAction.GENERAL_RESET_INFO }));
    yield put(ActionReducer({ type: AuthenAction.AUTHEN_LOGOUT_S }));
    e.onSuccess();
  } catch (err) {
    e.onFailure(err);
  }
}

// Login with token
function* authenTokenR(e: IActionSaga) {
  const { token, isFromAuthen } = e.payload;
  try {
    if (isFromAuthen) {
      yield put(ActionReducer({ type: AuthenAction.AUTHEN_LOGIN_S, payload: { token } }));
    }
    //
    const userInfo:any[] = yield callGet(`${host}/api/v1/mobile/show/profile`);
    yield put(ActionReducer({ type: GeneralAction.GENERAL_TOKEN_S, payload: { userInfo } }));
    e.onSuccess(userInfo);
  } catch (err) {
    e.onFailure(err);
  }
}

export default [
  takeLatest(AuthenAction.AUTHEN_LOGIN_R, (e: IActionSaga) => authenLoginR(e)),
  takeLatest(AuthenAction.AUTHEN_LOGOUT_R, (e: IActionSaga) => authenLogoutR(e)),
  takeLatest(AuthenAction.AUTHEN_TOKEN_R, (e: IActionSaga) => authenTokenR(e)),
];
