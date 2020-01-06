import React from 'react';
import './App.css';
import Stage from './Components/Stage';
// import Task from './Components/Task';

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
          {this.makechildren()}
        </Stage>
      );
    }
    console.log(outputList);
    return outputList;
  }
  makechildren() {
    const outputList = [];
  }
  render() {
    return (
      <div
        className="App"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        {this.renderStages()}
      </div>
    );
  }
}

export default App;
