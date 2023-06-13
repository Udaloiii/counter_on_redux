import React from 'react';
import s from './CounterField.module.css'
import {InputForOperation} from "../InputForOperation/InputForOperation";
import {useSelector} from "react-redux";
import {AppRootReducerType, useAppDispatch} from "../../redux/store";
import {
    incrDisabledAC,
    incrementValueAC,
    resDisabledAC,
    resetResultAC,
    setDisabledAC,
    setErrorAC,
    setNewValueTC
} from "../../redux/main-reducer";

type CounterFieldPropsType = {
    operation?: string
    title?: string
    buttonName: string
    buttonName1?: string
    maxValue?: number
    startValue?: number
    setResult?: (startValue: number) => void
}
export const CounterField = (props: CounterFieldPropsType) => {
    const {operation, buttonName, buttonName1, maxValue, startValue, setResult, ...restProps} = props
    const startNumber = useSelector<AppRootReducerType, number>(state => state.mainReducer.startValue)
    const maxNumber = useSelector<AppRootReducerType, number>(state => state.mainReducer.maxValue)
    let result = useSelector<AppRootReducerType, number>(state => state.mainReducer.result)
    const setButton = useSelector<AppRootReducerType, boolean>(state => state.mainReducer.setButton)
    const incrButton = useSelector<AppRootReducerType, boolean>(state => state.mainReducer.incrButton)
    const resButton = useSelector<AppRootReducerType, boolean>(state => state.mainReducer.resButton)
    const error = useSelector<AppRootReducerType, string | null>(state => state.mainReducer.error)

    const dispatch = useAppDispatch()

    //handler's
    const setResHandler = () => {
        if (setResult) {
            dispatch(setErrorAC(null))
            setResult(startNumber)
            dispatch(setNewValueTC(startNumber, maxNumber))
            dispatch(setDisabledAC(true))
            dispatch(incrDisabledAC(false))
        }
    }
    const incrResult = () => {
        dispatch(resDisabledAC(false))
        dispatch(incrementValueAC(++result))
        if (result > maxNumber) {
            dispatch(setErrorAC("Result must be less or equal to max value"))
            dispatch(incrDisabledAC(true))
        }
    }

    const resetResult = () => {
        dispatch(setErrorAC(null))
        dispatch(resetResultAC())
        dispatch(resDisabledAC(true))
        dispatch(incrDisabledAC(false))
    }
    return (
        <div className={s.mainBox}>
            <div className={s.numberBox}>
                {operation === 'numbers'
                    ? <InputForOperation/>
                    : <span className={s.result}>{error ? <span className={s.error}>{error}</span> : result}</span>}
            </div>
            <div className={s.setBox}>
                <div className={s.buttonBlock}>
                    {buttonName === "set" && <button onClick={setResHandler} disabled={setButton}>{buttonName}</button>}
                    {buttonName === "incr" && <button onClick={incrResult} disabled={incrButton}>{buttonName}</button>}
                    {operation === 'result' &&
                        <button disabled={resButton} onClick={resetResult}>{buttonName1}</button>}</div>
            </div>
        </div>
    );
};