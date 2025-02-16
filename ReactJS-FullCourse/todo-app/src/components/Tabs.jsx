export function Tabs(props) {
  //On the line below we've destructured our todo array
  const { todos, selectedTab, setSelectedTab } = props
    //Below, we created an array of tabs which is mapped over; creating a button for each array element in the return value. The mapping function takes in an arrow function that returns JSX.
    const tabs = ['All', 'Open', 'Completed']
    return (

      //Within the nav below we have logic for whether a given number of tasks are complete or not, placing tasks in the proper place according to completion status.
        <nav className="tab-container">
            
          {tabs.map((tab, tabIndex) => {
            const numOfTasks = tab === 'All' ? todos.length :
            tab === 'Open' ?
            todos.filter(val => !val.complete).length : todos.filter(val => val.complete).length
                  return (
                    <button onClick={() => {setSelectedTab(tab)}} key={tabIndex} className={"tab-button "
                      + (tab === selectedTab ? ' tab-selected' : '')}>
                        <h4>{tab} <span>({numOfTasks})</span></h4>
                    </button>
                  )
          })}
           <hr />
        </nav>
    )
}