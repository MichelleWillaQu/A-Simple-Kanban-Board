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
      <h5 className="stageTitle">{title}</h5>
      <p>{children}</p>
      <Collapse>
        <InputGroup></InputGroup>
      </Collapse>
    </Card>
  );
};

export default Stage;
