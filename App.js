import AddTask from './Add Task/AddTask';
import ShowList from './ShowList/showlist';
import './App.css';
import React, { useState } from "react";
import userEvent from '@testing-library/user-event';

function App() {
  const [taskList,setList]=useState([]);
  const [updateData, setUpdateData] = useState({})
  function addTaskHandler(tName, type, data){
    if (type === 'EDIT') {
      let myList = [...taskList];
      let obj = data;
      obj.name = tName;
      let myIndex =  myList.findIndex((el) => {return el.id === data.id});
      myList.splice(myIndex, 1, obj)
      setList(myList);
      setUpdateData({});
    } else {
      setList((prevTaskList)=>{
        return [...prevTaskList, {name : tName, id :Math.random().toString(), isSelected: false}];
      } );
    }
    
  }

  const deleteItemHandler = (list, index, taskId) => {
    if (taskId) {
      setList(prevTaskList => {
        const updatedTasks = prevTaskList.filter(task => task.id !== taskId);
        return updatedTasks;
      });
    } else {
      setList(prevTaskList => {
        const updatedTasks = list.filter(task => task.isSelected === false);
        return updatedTasks;
      });
    }
    
  };

  return (
    <div className="App">
       <AddTask onAddTask={addTaskHandler} updateData={updateData} updateName = {updateData.name} />
      <ShowList
        tasks={taskList}
        onDeleteItem={deleteItemHandler}
        onEditItem={(data) => {setUpdateData(data)}}
        />
    </div>
  );
}

export default App;
