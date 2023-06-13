import {Dispatch} from "redux";

export type InitialStateType = {
    maxValue: number
    startValue: number
    result: number
}

const startValue = localStorage.getItem("countStartValue")
const maxValue = localStorage.getItem("countMaxValue")

const initialState: InitialStateType = <InitialStateType>{
    maxValue: maxValue ? +maxValue : 0,
    startValue: startValue ? +startValue : 0,
    result: 0
}
// type for actions
type SetMaxValueType = ReturnType<typeof setMaxValueAC>
type SetStartValueType = ReturnType<typeof setStartValueAC>
type IncrementValueType = ReturnType<typeof incrementValueAC>
type SetValueType = ReturnType<typeof setValueAC>
type SetResultType = ReturnType<typeof setResultAC>
type SetNewValueType = ReturnType<typeof setNewValueAC>

type ActionType = SetMaxValueType | SetStartValueType | IncrementValueType | SetValueType | SetResultType | SetNewValueType
export const mainReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-MAX-VALUE": {

            return {...state, maxValue: action.maxValue}
        }
        case "SET-START-VALUE": {

            return {...state, startValue: action.startValue}
        }
        case "INCREMENT-VALUE": {
            return {...state, result: action.value + 1}
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

// export const getValueTC = () => (dispatch: Dispatch) => {
//     const startValue = localStorage.getItem("countStartValue")
//     const maxValue = localStorage.getItem("countMaxValue")
//     const finalStart = startValue? startValue : 0
//     const finalMax = maxValue? maxValue : 0
//         dispatch(setValueAC(+finalStart, +finalMax))
//     debugger
// }
// export const getValueTC = () => (dispatch: Dispatch) => {
//     dispatch(setValueAC(initialState.startValue, initialState.maxValue))
// }

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
    if(startValue && maxValue) {
        dispatch(setNewValueAC(+startValue, +maxValue))
    }
}