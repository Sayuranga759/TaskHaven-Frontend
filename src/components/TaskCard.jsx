import React, { useState } from "react";
import DatePicker from "react-datepicker";

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
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleDateChange = (date) => {
    setEditedTask({ ...editedTask, dueDate: date });
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
              name="title"
              placeholder="Title"
              value={editedTask.title}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editedTask.description}
              onChange={handleChange}
              className="form-control mb-2"
            />
            <DatePicker
              showIcon
              selected={new Date(editedTask.dueDate)}
              onChange={handleDateChange}
              className="form-control mb-2"
              dateFormat="yyyy-MM-dd"
            />
            <select
              name="status"
              value={editedTask.status}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value="To Do">To Do</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
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
              <h4>{task.title}</h4>
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
            <p className="card-text">{task.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <p className="card-text my-0">Due:&nbsp;</p>
                <p className="fw-bolder my-0">{formattedDate(new Date(task.dueDate))}</p>
              </div>
              <div class="d-flex">
                <p className="card-text my-0">Status:&nbsp;</p>
                <div class="badge bg-success text-wrap">{task.status}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
