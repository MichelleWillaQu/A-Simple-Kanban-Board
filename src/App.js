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
      isOpen: [false, false, false, false],
    };
    this.collapseClick = this.collapseClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  collapseClick(id) {
    const copyList = this.state.isOpen.slice();
    copyList[id] = !copyList[id];
    this.setState({ isOpen: copyList });
  }
  handleSubmit(id) {
    const el = '#input-' + id;
    const newTask = document.querySelector(el).value;
    const newTasksList = this.state.tasks;
    newTasksList.push({ [id]: newTask });
    const isOpenCopyList = this.state.isOpen;
    isOpenCopyList[id] = !isOpenCopyList[id];
    this.setState({ isOpen: isOpenCopyList, tasks: newTasksList });
  }
  renderStages() {
    const outputList = [];
    for (const idx in this.state.stages) {
      outputList.push(
        <Stage
          key={idx}
          title={this.state.stages[idx]}
          handleClick={this.collapseClick}
          handleSubmit={this.handleSubmit}
          isOpen={this.state.isOpen[idx]}
          stageId={idx}
        >
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
    console.log('YO ', this.state.tasks);
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
