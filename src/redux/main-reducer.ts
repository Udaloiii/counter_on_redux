import {Dispatch} from "redux";

export type InitialStateType = {
    maxValue: number
    startValue: number
    result: number
    setButton: boolean ///disabled
    incrButton: boolean ///not disabled
    resButton: boolean ///disabled
    error: string | null,
    infoMessage: string | null
}

const startValue = localStorage.getItem("countStartValue")
const maxValue = localStorage.getItem("countMaxValue")

const initialState: InitialStateType = {
    maxValue: maxValue ? +maxValue : 0,
    startValue: startValue ? +startValue : 0,
    result: startValue ? +startValue : 0,
    setButton: true, ///disabled
    incrButton: false, ///not disabled
    resButton: true, ///disabled
    error: null,
    infoMessage: null
}
// type for actions
type SetMaxValueType = ReturnType<typeof setMaxValueAC>
type SetStartValueType = ReturnType<typeof setStartValueAC>
type IncrementValueType = ReturnType<typeof incrementValueAC>
type SetValueType = ReturnType<typeof setValueAC>
type SetResultType = ReturnType<typeof setResultAC>
type SetNewValueType = ReturnType<typeof setNewValueAC>
type ResDisabledType = ReturnType<typeof resDisabledAC>
type IncrDisabledType = ReturnType<typeof incrDisabledAC>
type SetDisabledType = ReturnType<typeof setDisabledAC>
type SetErrorType = ReturnType<typeof setErrorAC>
type SetInfoMessageType = ReturnType<typeof setInfoMessageAC>
type ResetResultType = ReturnType<typeof resetResultAC>

type ActionType =
    SetMaxValueType
    | SetStartValueType
    | IncrementValueType
    | SetValueType
    | SetResultType
    | SetNewValueType
    | ResDisabledType
    | IncrDisabledType
    | SetDisabledType
    | SetErrorType
    | SetInfoMessageType
    | ResetResultType
export const mainReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-MAX-VALUE": {
            return {...state, maxValue: action.maxValue}
        }
        case "SET-START-VALUE": {
            return {...state, startValue: action.startValue}
        }
        case "INCREMENT-VALUE": {
            return {...state, result: action.value}
        }
        case "SET-VALUE": {
            return {...state, startValue: action.startValue, maxValue: action.maxValue}
        }
        case "SET-RESULT": {
            return {...state, result: action.startValue}
        }
        case "SET-NEW-VALUE": {
            return {...state, startValue: action.newStart, maxValue: action.newMax}
        }
        case "SET-DISABLED": {
            return {...state, setButton: action.disabled}
        }
        case "RES-DISABLED": {
            return {...state, resButton: action.disabled}
        }
        case "INCR-DISABLED": {
            return {...state, incrButton: action.disabled}
        }
        case "RESET-RESULT": {
            return {...state, result: 0}
        }
        case "SET-ERROR": {
            return {...state, error: action.error}
        }
        case "SET-MESSAGE": {
            return {...state, infoMessage: action.message}
        }
        default:
            return state
    }
}

export const setValueAC = (startValue: number, maxValue: number) => ({type: 'SET-VALUE', startValue, maxValue} as const)
export const setMaxValueAC = (maxValue: number) => {
    return {type: 'SET-MAX-VALUE', maxValue} as const
}

export const setStartValueAC = (startValue: number) => {
    return {type: 'SET-START-VALUE', startValue} as const
}

export const incrementValueAC = (value: number) => {
    return {type: 'INCREMENT-VALUE', value} as const
}

export const setResultAC = (startValue: number) => {
    return {type: 'SET-RESULT', startValue} as const
}

export const setNewValueAC = (newStart: number, newMax: number) => {
    return {type: 'SET-NEW-VALUE', newStart, newMax} as const
}

export const setNewValueTC = (newStart: number, newMax: number) => (dispatch: Dispatch) => {
    localStorage.setItem('countStartValue', JSON.stringify(newStart))
    localStorage.setItem('countMaxValue', JSON.stringify(newMax))
    const startValue = localStorage.getItem("countStartValue")
    const maxValue = localStorage.getItem("countMaxValue")
    if (startValue && maxValue) {
        dispatch(setNewValueAC(+startValue, +maxValue))
    }
}

export const resDisabledAC = (disabled: boolean) => {
    return {type: 'RES-DISABLED', disabled} as const
}

export const incrDisabledAC = (disabled: boolean) => {
    return {type: 'INCR-DISABLED', disabled} as const
}

export const setDisabledAC = (disabled: boolean) => {
    return {type: 'SET-DISABLED', disabled} as const
}

export const setErrorAC = (error: null | string) => {
    return {type: 'SET-ERROR', error} as const
}

export const setInfoMessageAC = (message: null | string) => {
    return {type: 'SET-MESSAGE', message} as const
}

export const resetResultAC = () => {
    return {type: 'RESET-RESULT'} as const
}