import React from 'react';
import './App.css';
import Stage from './Components/Stage';
import Task from './Components/Task';
import { Button, Icon } from '@blueprintjs/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: ['Backlog', 'To do', 'Ongoing', 'Done'],
      tasks: {
        'task 1': ['0', false],
        'task 2': ['0', false],
        'task 3': ['1', false],
        'task 4': ['2', false],
      },
      isOpen: [false, false, false, false],
    };
    this.collapseClick = this.collapseClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateTaskOptions = this.generateTaskOptions.bind(this);
    this.taskClick = this.taskClick.bind(this);
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
    newTasksList.push({ [newTask]: [id, false] });
    const isOpenCopyList = this.state.isOpen;
    isOpenCopyList[id] = !isOpenCopyList[id];
    this.setState({ isOpen: isOpenCopyList, tasks: newTasksList });
  }
  taskClick(name) {
    const currentList = this.state.tasks[name].slice();
    currentList[1] = !currentList[1];
    this.setState({ tasks: { ...this.state.tasks, [name]: currentList } });
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
    for (const taskArr of Object.entries(this.state.tasks)) {
      if (taskArr[1][0] === key) {
        if (taskArr[1][1]) {
          outputList.push(this.generateTaskOptions(key));
        }
        outputList.push(
          <Task
            key={taskArr[0]}
            title={taskArr[0]}
            clicked={taskArr[1][1]}
            taskClick={() => this.taskClick(taskArr[0])}
          />
        );
      }
    }
    return outputList;
  }
  generateTaskOptions(key) {
    let back = null;
    let forward = null;
    if (key !== '0') {
      back = (
        <Button
          className="back option"
          icon={<Icon iconSize="12" icon="chevron-left" color="white"></Icon>}
          text="Back"
        ></Button>
      );
    }
    if (key !== '4') {
      forward = (
        <Button
          className="forward option"
          icon={<Icon iconSize="12" icon="chevron-right" color="white"></Icon>}
          text="Forward"
        ></Button>
      );
    }
    return (
      <div className="taskoptions">
        {back}
        {forward}
        <Button
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
        ></Button>
      </div>
    );
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
