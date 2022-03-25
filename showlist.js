import React, { useState, useEffect, Fragment } from 'react';
import styles from './showlist.module.css';
// import EditTask from '../Edit Task/editTask';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import userEvent from '@testing-library/user-event';


function ShowList(props) {
  const [taskList, setTaskList] = useState(props.tasks ? props.tasks : []);
  const [isUpdate,setIsUpdate]=useState(false);
  useEffect(() => {
    setTaskList(props.tasks);
  }, [props.tasks]);

  const onChecked = (e, index) => {
    
    const list = [...taskList];
    console.log('checkmis ==> ', e.target.checked,list)
    list[index].isSelected = e.target.checked;
    setTaskList(list);
  }

  const onDelete = (index) => {
    props.onDeleteItem(taskList, index, null);
  }

  return (
    <Fragment>
      <button onClick={() => onDelete(null)} className={styles.button}>Delete</button>
    <div className={styles.root}>
     
      <table className={styles.tab}>
        {taskList && taskList.map((list, index) => (
          <tr key={list.id} className={styles.check}>
            <td> <input
              type="checkbox"
              id={list.id + 'check'}
              onChange={(e) => onChecked(e, index)}
              checked={list.isSelected} />
            </td>
            <td> {list.name} </td>
            <td><EditOutlined style={{ margin: 10 }} onClick={() => {
              props.onEditItem(list)
            }} /> </td>
            <td><DeleteOutlined style={{ margin: 10, color: "red" }} onClick={() => {
              props.onDeleteItem(taskList, null, list.id)
            }} /> </td>
          </tr>
        ))}
      </table>
    </div>
    </Fragment>
    
  );
}

export default ShowList;