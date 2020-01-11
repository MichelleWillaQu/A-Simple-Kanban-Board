// Stage that holds the tasks
import React from 'react';
import {
  Button,
  Card,
  Collapse,
  Elevation,
  InputGroup,
} from '@blueprintjs/core';

const Stage = ({
  title,
  stageId,
  children,
  handleClick,
  handleSubmit,
  isOpen,
}) => {
  const submitButton = (
    <Button onClick={() => handleSubmit(stageId)} className="green confirm">
      Confirm
    </Button>
  );
  return (
    <Card className="stage" elevation={Elevation.TWO}>
      <h3 className="stageTitle">{title}</h3>
      {children}
      <Button
        className="green add"
        onClick={() => handleClick(stageId)}
        hidden={isOpen}
      >
        Add Task
      </Button>
      <Collapse isOpen={isOpen}>
        <InputGroup
          className="input"
          rightElement={submitButton}
          id={'input-' + stageId}
          placeholder="Task Name"
        ></InputGroup>
      </Collapse>
    </Card>
  );
};

export default Stage;
