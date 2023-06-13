import React from 'react';
import s from './CounterField.module.css'
import {InputForOperation} from "../InputForOperation/InputForOperation";
import {useSelector} from "react-redux";
import {AppRootReducerType, useAppDispatch} from "../../redux/store";
import {setNewValueTC} from "../../redux/main-reducer";

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
    const result = useSelector<AppRootReducerType, number>(state => state.mainReducer.result)
    const dispatch= useAppDispatch()
    const setResHandler = ()=> {
       if(setResult) {
           setResult(startNumber)
           dispatch(setNewValueTC(startNumber, maxNumber))
       }
    }
    return (
        <div className={s.mainBox}>
            <div className={s.numberBox}>
                {operation === 'numbers'
                    ? <InputForOperation/>
                    : <span className={s.result}>{result}</span>}
            </div>
            <div className={s.setBox}>
                <div className={s.buttonBlock}>
                    <button onClick={setResHandler}>{buttonName}</button>
                    {operation === 'result' && <button>{buttonName1}</button>}</div>
            </div>
        </div>
    );
};