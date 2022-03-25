import styles from './AddTask.module.css';
import React, { useState, useEffect } from "react";

function AddTask(props) {
    const [enteredTask,setEnteredTask]=useState('');
    const [type, setType]=useState('ADD');

    function addTaskHandler(event) {
        event.preventDefault();
        // console.log(enteredTask)
       if (type === 'EDIT') {

        props.onAddTask(enteredTask, 'EDIT', props.updateData);
        setType('ADD')
       } else {
        props.onAddTask(enteredTask, 'ADD', props.updateData);
       }
        
       
        setEnteredTask('');  
       
    }
    function taskChangeHandler(event){
        setEnteredTask(event.target.value);
    }

    useEffect(() => {
        if(props.updateName && props.updateName !== '') {
            setType('EDIT');
            setEnteredTask(props.updateName)
        } else {
            setType('ADD');
            setEnteredTask(props.updateName)
        }
        
    }, [props.updateName])
    
    return(
        <div>
           <form onSubmit={addTaskHandler}>
            <input type="text" id="task" className={styles.input} onChange={taskChangeHandler} value={enteredTask}/>
            <button type="submit" className={styles.button}>{type === 'EDIT' ? 'Edit' : 'Add'}</button>
           </form>
    
        </div>
        
    );
}

export default AddTask;