import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {mainReducer} from "./main-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";

const RootReducer = combineReducers({
    mainReducer: mainReducer
})

export type AppRootReducerType = ReturnType<typeof RootReducer>
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootReducerType, any, AnyAction>>()
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store