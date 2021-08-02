import { useSelector } from 'react-redux';
import { IStates } from 'src/stores/root.reducer';
import authService from 'src/services/auth.service';
import { isLoginScreen } from 'src/services/utils';

function AuthGuard(props: any) {
  const { children } = props;
  const { token } = useSelector((state: IStates) => state.authenReducer);
  // Authen Only
  const isAuthen = authService.isValidToken(token);
  if (isAuthen === false) {
    if (isLoginScreen) {
      window.location.href = `${window.location.origin}/admin/login`;
    } else {
      window.location.href = `${process.env.REACT_APP_WEB_HOST}`;
    }
  }

  return children;
}

export default AuthGuard;
