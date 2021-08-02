import { all } from 'redux-saga/effects';
import authenSaga from './authen/authen.saga';

const rootSaga = function*(){
    yield all([
        ...authenSaga
    ]);
}
export default rootSaga