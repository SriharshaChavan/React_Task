import React, { useState } from "react";
import  PropTypes  from "prop-types";
import { Checkbox, IconButton, ListItem, TextField } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

function TodoItem({ task, onEdit, onDelete, onComplete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit({ ...task, title });
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  const handleComplete = () => {
    onComplete(task);
  };

  return (
    <ListItem>
      <Checkbox checked={task.completed} onChange={handleComplete} />
      {editing ? (
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            } else if (e.key === "Escape") {
              setEditing(false);
              setTitle(task.title);
            }
          }}
        />
      ) : (
        <div onClick={handleEdit}>{task.title}</div>
      )}
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
      <IconButton onClick={handleEdit}>
        <Edit />
      </IconButton>
    </ListItem>
  );
}
TodoItem.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
  };

export default TodoItem;
