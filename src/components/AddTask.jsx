import React, { useState } from "react";
import DatePicker from "react-datepicker";
import * as EndPoints from "../constants/end_points";
import { axiosWithAuth } from "../services/apiBase";

const AddTask = ({ setTasks, tasks }) => {
  const [isAdding, setIsAdding] = useState(false);

  const [taskInfo, setTaskInfo] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    status: 'to_do',
    priorityID: 1
  });

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "priorityID" ? Number(value) : value;
    setTaskInfo({ ...taskInfo, [name]: updatedValue });
  };

  const handleDateChange = (date) => {
    setTaskInfo({ ...taskInfo, dueDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL + EndPoints.API_ENDPOINTS.MANAGE_TASKS;
    console.log(taskInfo);
    await axiosWithAuth.post(apiUrl, taskInfo)
      .then(response => {
        console.log('Task added successfully');
        setTasks([...tasks, response.data]);
        setIsAdding(false);
        setTaskInfo({
          title: '',
          description: '',
          dueDate: new Date(),
          status: 'to_do',
          priorityID: 1
        })
      })
      .catch(error => {
        console.error('Error occured when adding task', error);
      });
  };

  const handleCancel = () => {
    setIsAdding(false);
  }

  return (
    <div>
      {!isAdding ? (
        <div class="justify-content-center">
          <button
            type="button"
            class="btn btn-secondary btn-lg mt-3 align-items-center "
            onClick={handleAdd}
          >
            Add new task
          </button>
        </div>
      ) : (
        <div className="card my-2">
          <div className="card-body">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={taskInfo.title}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={taskInfo.description}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <DatePicker
              showIcon
              selected={new Date(taskInfo.dueDate)}
              onChange={handleDateChange}
              className="form-control mb-2"
              dateFormat="yyyy-MM-dd"
            />
            <select
              name="status"
              value={taskInfo.status}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value="to_do">To Do</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
            <select
              name="priorityID"
              value={taskInfo.priorityID}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value='1'>Low</option>
              <option value='2'>Medium</option>
              <option value='3'>High</option>
            </select>
            <div className="d-flex gap-2">
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
