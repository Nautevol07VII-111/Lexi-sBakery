import { TodoCard } from "./TodoCard";
import { Tabs } from "./Tabs";

export function TodoList(props) {
    const { todos, selectedTab } =props
    
    
    //The logic below creates a filtered todo list where if tab is = to All we access all todos and assign them to filterTodosList, otherwise we check if the tab is equal to completed, then we filter out all of the todos that arent completed where whatever's left is assigned to the filterTodosList variable, and for the active todos we filter those that arent and assign them to the filter variable.
    const filterTodosList = selectedTab === 'All' ? 
    todos : selectedTab === 'All' ? todos : selectedTab === 'Completed' ? todos.filter(val => val.complete) :
    todos.filter(val => !val.complete)
    return (
        <>
          {filterTodosList.map((todo, todoIndex) => {
            return (
                <TodoCard key={todoIndex} 
                todoIndex={todoIndex}
                 {...props}
                todo={todo}/>
            )
          

          })}

        </>
    )
}