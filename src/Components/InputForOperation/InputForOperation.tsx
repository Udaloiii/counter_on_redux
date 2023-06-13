import React, {ChangeEvent} from 'react';
import s from './InputForOperation.module.css'
import {useSelector} from "react-redux";
import {AppRootReducerType, useAppDispatch} from "../../redux/store";
import {incrDisabledAC, resDisabledAC, setDisabledAC, setMaxValueAC, setStartValueAC} from "../../redux/main-reducer";

type InputForOperationType = {}
export const InputForOperation = (props: InputForOperationType) => {
    const startValue = useSelector<AppRootReducerType, number>(state => state.mainReducer.startValue)
    const maxValue = useSelector<AppRootReducerType, number>(state => state.mainReducer.maxValue)
    const dispatch = useAppDispatch()

    const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value <= 15 && +e.currentTarget.value >= startValue) {
            dispatch(setDisabledAC(false))
            dispatch(incrDisabledAC(true))
            dispatch(resDisabledAC(true))
            dispatch(setMaxValueAC(+e.currentTarget.value))
        }
    }
    const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value >= 0 && +e.currentTarget.value <= maxValue) {
            dispatch(setDisabledAC(false))
            dispatch(incrDisabledAC(true))
            dispatch(resDisabledAC(true))
            dispatch(setStartValueAC(+e.currentTarget.value))
        }
    }
    return (
        <div className={s.mainBox}>
            <div className={s.inputOperationBlock}>
                <div className={s.value}>max value</div>
                <input type="number" value={maxValue} onChange={onChangeMax}/>
            </div>
            <div className={s.inputOperationBlock}>
                <div className={s.value}>min value</div>
                <input type="number" value={startValue} onChange={onChangeStart}/>
            </div>
        </div>
    );
};