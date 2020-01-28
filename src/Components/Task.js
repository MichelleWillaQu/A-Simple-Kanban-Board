// A Task
import React from 'react';

const Task = ({ title, clicked, taskClick }) => {
  // data-testid
  const taskTestId = `task-${title.split(' ').join('-')}`;

  return (
    <div
      data-testid={taskTestId}
      className={'task' + (clicked ? ' clicked' : '')}
      onClick={taskClick}
    >
      {title}
    </div>
  );
};

export default Task;
