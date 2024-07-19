import React, { useState } from "react";
import Task from "../components/TaskCard";
import background from "../assets/background.jpg";


const sampleTasks = [
  {
      id: 1,
      title: 'Task 1',
      description: 'This is a short description for task 1',
      dueDate: '2024-07-01',
      status: 'Pending'
  },
  {
      id: 2,
      title: 'Task 2',
      description: 'This is a short description for task 2',
      dueDate: '2024-07-05',
      status: 'In Progress'
  },
  {
      id: 3,
      title: 'Task 3',
      description: 'This is a short description for task 3',
      dueDate: '2024-07-10',
      status: 'Completed'
  }
];

const UserHomePage = () => {

  const [tasks, setTasks] = useState(sampleTasks);

  const handleEdit = (taskId, updatedTask) => {
      // Logic to handle edit
      const updatedTasks = tasks.map(task => {
          if(task.id === taskId) {
              return updatedTask;
          }
          return task;
      });
      setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
      // Logic to handle delete
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
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

        <div class="container-md p-3 my-2 col-lg-6">
            <div class="my-2"><h2>Task List</h2></div>
            {tasks.map(task => (
                <Task key={task.id} task={task} 
                onEdit={(updatedTask) => handleEdit(task.id, updatedTask)} 
                onDelete={() => handleDelete(task.id)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
