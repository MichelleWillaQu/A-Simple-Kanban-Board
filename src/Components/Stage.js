// Stage that holds the tasks
import React from 'react';

const Stage = ({ title, stageId, children }) => {
  return (
    <div className="stage">
      <h4 className="stageTitle">{title}</h4>
      {children}
    </div>
  );
};

export default Stage;
