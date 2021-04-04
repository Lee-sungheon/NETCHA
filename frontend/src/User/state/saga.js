// import { all, call, put, takeLeading } from "redux-saga/effects";
// import { actions, types } from "./index";
// import { callApiLogin } from "../../common/api";

// export function* fetchData() {
//   yield put(actions.setLoading(true));
//   yield put(actions.setValue("error", ""));
//   try {
//     const data = yield call(callApiMovieList);
//     yield put(actions.setMovieList(data));
//   } catch (error) {
//     yield put(actions.setValue("error", error));
//   }
//   yield put(actions.setLoading(false));
//   yield put(actions.userLogin());

//   try {
//     const data = yield call(callApiMovieList);
//     yield put(actions.setMovieList(data))
//   } catch(error) {
//     yield put(actions.setValue('error', error))
//   }
//   yield put(actions.userLogin(data))
// }

// export function* login(action) {
//     yield put(actions.setLoading(true));
//     yield put(actions.setValue("error",""))
//     try {
//         const data = yield call(callApiLogin, action.userData)
//         if (data !== undefined) {
//           yield put(actions.userLogin(data))
//           window.sessionStorage.setItem("userId", data.member.userId);
//           window.sessionStorage.setItem("token", data.token);
//           history.push({
//             pathname: "/",
//           });
//           alert("로그인되었습니다.");
//         }
//     } catch(error) {
//       yield put(actions.setValue('error', error))
//     }
//     yield put(actions.setLoading(false))
// }

export default function* () {
  yield all([takeLeading(types.login, fetchData)]);
}
