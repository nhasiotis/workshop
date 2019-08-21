import { call, takeEvery, put} from 'redux-saga/effects'
import { get } from '../../services/api';
import { dataFetchSucceeded , dataFetchFailed, DATA_FETCH_REQUESTED} from '../actions'

//worker Saga: will be fired on DATA_FETCH_REQUESTED actions
export function* fetchData(){
    try{
        const data = yield call(get, 'http://localhost:3000/items');
        yield put(dataFetchSucceeded(data))
    } catch (e){
        yield put(dataFetchFailed(e.message))
    }
}

/*
  Starts fetchData on each dispatched `DATA_FETCH_REQUESTED` action.
  Allows concurrent fetches of data.
*/
export function* mySaga() {
  yield takeEvery(DATA_FETCH_REQUESTED, fetchData);
}

export default mySaga