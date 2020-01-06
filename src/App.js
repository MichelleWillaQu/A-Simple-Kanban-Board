import React from 'react';
import './App.css';
import Stage from './Components/Stage';
// import Task from './Components/Task';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stages: ['Backlog', 'To do', 'Ongoing', 'Done'] };
  }
  renderStages() {
    const outputList = [];
    for (const idx in this.state.stages) {
      outputList.push(<Stage key={idx} title={this.state.stages[idx]}></Stage>);
    }
    console.log(outputList);
    return outputList;
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
