// A Task
import React from 'react';
import { Button } from '@blueprintjs/core';

const Task = ({ title, clicked, taskClick }) => {
  return (
    <div>
      <div className={'task' + (clicked ? ' clicked' : '')} onClick={taskClick}>
        {title}
      </div>
    </div>
  );
};

export default Task;
