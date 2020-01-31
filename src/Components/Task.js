// A Task
import React from 'react';
import { Button, Icon } from '@blueprintjs/core';

const Task = ({
  title,
  clicked,
  taskClick,
  stageId,
  moveBackwards,
  moveForwards,
  deleteTask,
}) => {
  // data-testid attributes
  const stageTestId = `stage-${stageId}`;
  const taskTestId = `task-${title.split(' ').join('-')}`;
  const moveLeftButtonTestId = `${stageTestId}-move-left`;
  const moveRightButtonTestId = `${stageTestId}-move-right`;
  const deleteButtonTestId = `${stageTestId}-delete`;

  // Generate the buttons
  let buttons = null;
  if (clicked) {
    let back = null;
    let forward = null;
    if (stageId !== '0') {
      back = (
        <Button
          data-testid={moveLeftButtonTestId}
          className="back option"
          icon={<Icon iconSize="12" icon="chevron-left" color="white"></Icon>}
          text="Back"
          onClick={moveBackwards}
        ></Button>
      );
    }
    if (stageId !== '4') {
      forward = (
        <Button
          data-testid={moveRightButtonTestId}
          className="forward option"
          icon={<Icon iconSize="12" icon="chevron-right" color="white"></Icon>}
          text="Forward"
          onClick={moveForwards}
        ></Button>
      );
    }
    buttons = (
      <div className="taskoptions">
        {back}
        {forward}
        <Button
          data-testid={deleteButtonTestId}
          className="delete option"
          icon={
            <Icon
              className="trashcan"
              iconSize="12"
              icon="trash"
              color="white"
            ></Icon>
          }
          small={true}
          text="Delete"
          onClick={deleteTask}
        ></Button>
      </div>
    );
  }

  return (
    <div>
      {buttons}
      <div
        data-testid={taskTestId}
        className={'task' + (clicked ? ' clicked' : '')}
        onClick={taskClick}
      >
        {title}
      </div>
    </div>
  );
};

export default Task;
