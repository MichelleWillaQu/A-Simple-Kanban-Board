// Stage that holds the tasks
import React from 'react';
import {
  Button,
  Card,
  Collapse,
  Elevation,
  InputGroup,
} from '@blueprintjs/core';

const Stage = ({ title, stageId, children }) => {
  return (
    <Card className="stage" elevation={Elevation.TWO}>
      <h3 className="stageTitle">{title}</h3>
      {children}
      <Collapse>
        <InputGroup
          rightElement={widget - button}
          small={small}
          placeholder="Task Name"
        ></InputGroup>
      </Collapse>
    </Card>
  );
};

export default Stage;
