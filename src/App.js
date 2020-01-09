import React from 'react';
import './App.css';
import Stage from './Components/Stage';
import Task from './Components/Task';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: ['Backlog', 'To do', 'Ongoing', 'Done'],
      tasks: [
        { 0: 'task 1' },
        { 0: 'task 2' },
        { 1: 'task 3' },
        { 2: 'task 4' },
      ],
    };
  }
  renderStages() {
    const outputList = [];
    for (const idx in this.state.stages) {
      outputList.push(
        <Stage key={idx} title={this.state.stages[idx]}>
          {this.makechildren(idx)}
        </Stage>
      );
    }
    return outputList;
  }
  makechildren(key) {
    const outputList = [];
    for (const item of this.state.tasks) {
      if (item[key]) {
        outputList.push(<Task key={item[key]} title={item[key]} />);
      }
    }
    return outputList;
  }
  render() {
    return (
      <span>
        <h1 style={{ textAlign: 'center' }}>Kanban Board</h1>
        <div
          className="App"
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          {this.renderStages()}
        </div>
      </span>
    );
  }
}

export default App;
