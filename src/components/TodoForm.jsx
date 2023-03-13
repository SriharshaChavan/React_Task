import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";

function TodoForm({ onSubmit }) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = inputRef.current.value.trim();
    if (title) {
      onSubmit({ title, completed: false });
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{"marginTop":"100px"}}>
      <TextField inputRef={inputRef} label="Enter your Task" />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoForm;
