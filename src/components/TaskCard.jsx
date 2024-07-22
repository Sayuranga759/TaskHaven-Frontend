import React, { useState } from "react";
import DatePicker from "react-datepicker";
import * as Constants from "../constants/constants";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "PriorityID" ? Number(value) : value;
    setEditedTask({ ...editedTask, [name]: updatedValue });
  };

  const handleDateChange = (date) => {
    setEditedTask({ ...editedTask, DueDate: date });
  };

  const formattedDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  };

  return (
    <div className="card my-2">
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              name="Title"
              placeholder="Title"
              value={editedTask.Title}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <textarea
              name="Description"
              placeholder="Description"
              value={editedTask.Description}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <DatePicker
              showIcon
              selected={new Date(editedTask.DueDate)}
              onChange={handleDateChange}
              className="form-control mb-2"
              dateFormat="yyyy-MM-dd"
            />
            <select
              name="Status"
              value={editedTask.Status}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value="to_do">To Do</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
            <select
              name="PriorityID"
              value={editedTask.PriorityID}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-danger" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div class="d-flex justify-content-between align-items-center">
              <h4>{task.Title}</h4>
              <div class="d-flex gap-1">
                <button
                  className="btn btn-primary me-2"
                  onClick={handleEdit}
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  <i class="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
            <p className="card-text">{task.Description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <p className="card-text my-0">Due:&nbsp;</p>
                <p className="fw-bolder my-0">{formattedDate(new Date(task.DueDate))}</p>
              </div>
              <div class="d-flex">
                <p className="card-text my-0">Status:&nbsp;</p>
                <div class="badge bg-success text-wrap">{Constants.statusLabels[task.Status]}</div>
              </div>
            </div>
            <div class="d-flex mt-1">
                <p className="card-text my-0">Priority:&nbsp;</p>
                <p className="fw-bolder my-0">{Constants.priorityLabels[task.PriorityID]}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
