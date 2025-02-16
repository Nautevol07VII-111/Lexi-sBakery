import { useState } from 'react'

export function TodoInput(props) {
    const {handleAddTodo} = props //What we've done on this line is destructure the handleAddTodo function from the App.jsx file.
    const [inputValue, setInputValue] = useState('') //On this line we've created a stateful variable that handles values inside of the todo (as an empty string), hence the input value attribute.
    return (
        <div className="input-container">
        <input value={inputValue} onChange={(e)=> {setInputValue(e.target.value)}} placeholder="Add task"/> 
         <button onClick={() => { 
            if (!inputValue) { return }
            handleAddTodo(inputValue) 
            setInputValue('')
            }}>
         <i className="fa-solid fa-circle-plus"></i>
         </button>

        </div>
    ) 
    //In the return block above we have what's called a guard clause on line 10, the guard clause is there to handle invalid input
}