import React, { useState, useEffect } from "react";
import Task from "../components/TaskCard";
import * as EndPoints from "../constants/end_points";
import background from "../assets/background.jpg";
import AddTask from "../components/AddTask";
import { axiosWithAuth } from "../services/apiBase";

const UserHomePage = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL + EndPoints.API_ENDPOINTS.MANAGE_TASKS
    axiosWithAuth.get(apiUrl)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error occured when fetch tasks', error);
      });
  }, []);

  const handleEdit = (taskId, updatedTask) => {
    const apiUrl = process.env.REACT_APP_API_URL + EndPoints.API_ENDPOINTS.MANAGE_TASKS;
    console.log(updatedTask);

    axiosWithAuth.put(apiUrl, updatedTask)
      .then(response => {
        const updatedTasks = tasks.map(task => 
          task.TaskID === taskId ? updatedTask : task
        );
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error('Error occured when updating task', error);
      });
  };

  const handleDelete = (taskId) => {

    const apiUrl = process.env.REACT_APP_API_URL + EndPoints.API_ENDPOINTS.MANAGE_TASKS;

    axiosWithAuth.delete(apiUrl, { data: { TaskID: taskId } })
      .then(response => {
        const updatedTasks = tasks.filter(task => task.TaskID !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error('Error occured when deleting task', error);
      });
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <div class="container">
          <div class="row">
            <div class="container-md p-3 mt-2 col-lg-6">
              <div class="my-2"><h2>Is there anything to track ?</h2></div>
              <AddTask setTasks={setTasks} tasks={tasks}  />
            </div>
          </div>   
          <div class="row">
            <div class="container-md p-3 my-2 col-lg-6">
              <div class="my-2"><h2>Task List</h2></div>
              {tasks.map(task => (
                  <Task key={task.TaskID} task={task} 
                  onEdit={(updatedTask) => handleEdit(task.TaskID, updatedTask)} 
                  onDelete={() => handleDelete(task.TaskID)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
