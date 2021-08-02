import { useSelector } from 'react-redux';
import { IStates } from 'src/stores/root.reducer';
import authService from 'src/services/auth.service';

function GuestGuard(props: any) {
  const { children } = props;
  const { token } = useSelector((state: IStates) => state.authenReducer);

  // Guest Only
  const isAuthen = authService.isValidToken(token);
  if (isAuthen) {
    window.location.href = `${window.location.origin}/admin/dashboard`;
  }

  return children;
}

export default GuestGuard;
