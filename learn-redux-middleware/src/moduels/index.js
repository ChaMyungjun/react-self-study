import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import counter, {counterSaga} from './counter';
import sample, { sampleSaga } from '../moduels/sample';
import loading from './loading';

const rootReducer = combineReducers({
    counter,
    sample,
    loading
});

export function* rootSaga() {
    //all 함수가 여러 사가를 합쳐줌
    yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
