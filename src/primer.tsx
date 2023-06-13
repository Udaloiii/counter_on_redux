import React, {useEffect, useState} from 'react';
import style from './App.module.css';

function App() {
    let [result, setResult] = useState<number>(0)
    let [error, setError] = useState<null | string>(null)
    const [disable, setDisable] = useState(true)
    const [disableIncr, setDisableIncr] = useState(false)
    const [textForSet, setTextForSet] = useState("")

    const [maxValue, setMaxValue] = useState(() => {
        return Number(localStorage.getItem('countMaxValue')) || 5
    })
    const [startValue, setStartValue] = useState(
        () => {
            return Number(localStorage.getItem('countStartValue')) || 0
        }
    )
    const [disableSet, setDisableSet] = useState(true)
    const [inputMaxError, setMaxInputError] = useState("")
    const [inputStartError, setStartInputError] = useState("")

    function incrNumber() {
        if (result < maxValue && startValue >= 0) {
            setResult(result + 1)
            setDisable(false)
        } else {
            setDisableIncr(true)
            setError("No more!")
        }
    }

    function resNumber() {
        setError(null)
        setResult(0)
        setDisableIncr(false)
        setDisable(true)
    }

    function setValue() {
        setError("")
        setMaxInputError("")
        setStartInputError("")
        setResult(startValue)
        setDisableSet(true)
        setDisableIncr(false)
        setTextForSet("")
        localStorage.setItem('countStartValue', JSON.stringify(startValue))
        localStorage.setItem('countMaxValue', JSON.stringify(maxValue))
    }

    //useEffect для startValue
    useEffect(() => {
        setResult(startValue)
        localStorage.getItem("countStartValue")
    }, [startValue])

    //useEffect для maxValue
    useEffect(() => {
        localStorage.getItem("countMaxValue")
    }, [maxValue])


    return (
        <div className={style.App}>
            <div className={style.block}>
                <div className={style.resultBlock}>
                    <div className={style.valueBlock}>
                        <div className={style.value}>
                            <span className={style.nameValue}>max value:</span>
                            <input className={inputMaxError ? style.inputError : style.input}
                                   type="number" value={maxValue}
                                   onChange={(event) => {
                                       setError("")
                                       setDisableIncr(true)
                                       setStartInputError("")
                                       setTextForSet("enter values and press 'set'")
                                       if (+event.currentTarget.value > startValue && startValue >= 0) {
                                           setMaxInputError("")
                                           setDisableSet(false)
                                           setMaxValue(+event.currentTarget.value)
                                       } else if (+event.currentTarget.value === startValue && +event.currentTarget.value > 0) {
                                           setMaxValue(+event.currentTarget.value)
                                           setMaxInputError("error")
                                           setError("maxValue are not more then startValue")
                                           setDisableSet(true)
                                       } else if (+event.currentTarget.value <= 0 && (startValue < 0 || startValue < -1)) {
                                           setMaxValue(+event.currentTarget.value)
                                           setMaxInputError("error")
                                           setError("rechange startValue")
                                           setDisableSet(true)
                                       } else if (+event.currentTarget.value === 0) {
                                           setMaxValue(+event.currentTarget.value)
                                           setMaxInputError("error")
                                           setError("maxValue are not more then startValue")
                                           setDisableSet(true)
                                       } else {
                                           setMaxInputError("error")
                                           setError("maxValue are not more then startValue")
                                       }
                                   }}/>
                        </div>
                        <div className={style.value}>
                            <span className={style.nameValue}>start value:</span>
                            <input className={inputStartError ? style.inputError : style.input} type="number"
                                   value={startValue}
                                   onChange={(event) => {
                                       setError("")
                                       setDisableIncr(true)
                                       setTextForSet("enter values and press 'set'")
                                       if (+event.currentTarget.value >= 0 && +event.currentTarget.value < maxValue) {
                                           setMaxInputError("")
                                           setStartInputError("")
                                           setDisableSet(false)
                                           setStartValue(+event.currentTarget.value)
                                       } else if (+event.currentTarget.value === -1 || +event.currentTarget.value === maxValue) {
                                           setStartValue(+event.currentTarget.value)
                                           setStartInputError("error")
                                           setError("startValue < 0 or = maxValue")
                                           setStartInputError("error")
                                           setDisableSet(true)
                                       } else {
                                           setError("startValue < 0 or = maxValue")
                                       }
                                   }}/>
                        </div>
                    </div>
                </div>
                <div className={style.mainOperationBlock}>
                    <div className={style.operationBlock}>
                        <button className={style.operation} onClick={setValue} disabled={disableSet}>set</button>
                    </div>
                </div>
            </div>
            <div className={style.block}>
                <div className={style.resultBlock}>
                    <div className={style.result}>
                        {error ?
                            <div className={style.error}>{error}</div>
                            : textForSet ?
                                <div className={style.setText}>{textForSet}</div>
                                : result}
                    </div>
                </div>
                <div className={style.mainOperationBlock}>
                    <div className={style.operationBlock}>
                        <button className={style.operation} onClick={incrNumber} disabled={disableIncr}>incr</button>
                        <button className={style.operation} disabled={disable} onClick={resNumber}>res</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;