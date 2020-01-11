// A Task
import React from 'react';
import { Button } from '@blueprintjs/core';

const Task = ({ title, clicked, taskClick }) => {
  return (
    <div>
      {clicked ? (
        <div className="buttons">
          <Button>Back</Button>
          <Button>Forward</Button>
          <Button>Delete</Button>
        </div>
      ) : null}
      <div className="task" onClick={taskClick}>
        {title}
      </div>
    </div>
  );
};

export default Task;
