import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

function getUsers(username) {
    return axios.post('http://localhost:3001/users',{ username })
	.then(result => new Promise((resolve, reject) => {
        resolve(username);
    })).catch(error => {return username})
}
export default function* sagas() {
  yield takeLatest("GET_USERNAME", showUsers);
 
}
function* showUsers(action) {
  try {
    const username = yield call(getUsers, action.username);
    yield put({ type: 'SET_USERNAME', username });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
