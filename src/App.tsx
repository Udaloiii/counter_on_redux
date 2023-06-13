import React from 'react';
import style from './App.module.css';
import {CounterField} from "./Components/CounterField/CounterField";
import {useAppDispatch} from "./redux/store";
import {setResultAC} from "./redux/main-reducer";

function App() {
    const dispatch = useAppDispatch()

    function setResult(startValue: number) {
        dispatch(setResultAC(startValue))
    }

    return (
        <div className={style.App}>
            <CounterField operation={"numbers"} title={"max value"} buttonName={"set"} setResult={setResult}/>
            <CounterField operation={"result"} title={"max value"} buttonName={"incr"} buttonName1={"res"}/>
        </div>
    );
}

export default App;

