import React from 'react';
import './App.css';
import Stage from './Components/Stage';
import Task from './Components/Task';
import { Button } from '@blueprintjs/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: ['Backlog', 'To do', 'Ongoing', 'Done'],
      tasks: {},
      isOpen: [false, false, false, false],
      isSelected: '',
      localStorage: true,
    };
    this.componentDidCleanup = this.componentDidCleanup.bind(this);
    this.collapseClick = this.collapseClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.taskClick = this.taskClick.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.moveBackwards = this.moveBackwards.bind(this);
    this.moveForwards = this.moveForwards.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
  }
  componentDidMount() {
    // Event called when window, document, and resources are about to be unloaded
    window.addEventListener('beforeunload', this.componentDidCleanup);
    if (localStorage) {
      const storage = localStorage.getItem('tasks');
      if (storage) {
        this.setState({ tasks: JSON.parse(storage) });
      }
    } else {
      alert('Sorry your browser does not support HTML5 Web Storage.');
      this.setState({ localStorage: false });
    }
  }
  componentWillUnmount() {
    // Does not fire when the user closes or refreshes the page so must have event listener
    this.componentDidCleanup();
    // Remove to resume normal unmounting
    window.removeEventListener('beforeunload', this.componentDidCleanup);
  }
  componentDidCleanup() {
    const currentTasks = Object.assign({}, this.state.tasks);
    if (this.state.isSelected) {
      currentTasks[this.state.isSelected][1] = false;
    }
    if (this.state.localStorage) {
      localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }
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
    if (newTask in newTasksList) {
      alert(
        'Name already used. Please choose a different name or delete the old task.'
      );
    } else {
      newTasksList[newTask] = [id, false];
      const isOpenCopyList = this.state.isOpen.slice();
      isOpenCopyList[id] = !isOpenCopyList[id];
      this.setState({ isOpen: isOpenCopyList, tasks: newTasksList });
    }
  }
  taskClick(name) {
    if (this.state.isSelected) {
      const currentList = this.state.tasks[name].slice();
      currentList[1] = !currentList[1];
      if (currentList[1]) {
        // Enter only if the current task has just been selected so turn off the other selected task
        const oldList = this.state.tasks[this.state.isSelected].slice();
        oldList[1] = false;
        this.setState({
          tasks: {
            ...this.state.tasks,
            [name]: currentList,
            [this.state.isSelected]: oldList,
          },
          isSelected: name,
        });
      } else {
        // The current task was just deselected (turned false)
        this.setState({
          tasks: { ...this.state.tasks, [name]: currentList },
          isSelected: '',
        });
      }
    } else {
      // There is no currently selected task
      const currentList = this.state.tasks[name].slice();
      currentList[1] = !currentList[1];
      this.setState({
        tasks: { ...this.state.tasks, [name]: currentList },
        isSelected: name,
      });
    }
  }
  deleteTask() {
    // Copy the tasks object
    const currentTasks = Object.assign({}, this.state.tasks);
    delete currentTasks[this.state.isSelected];
    this.setState({ tasks: currentTasks, isSelected: '' });
  }
  moveBackwards() {
    let taskArr = this.state.tasks[this.state.isSelected].slice();
    const newLocation = (parseInt(taskArr[0]) - 1).toString();
    taskArr = [newLocation, false];
    this.setState({
      tasks: { ...this.state.tasks, [this.state.isSelected]: taskArr },
      isSelected: '',
    });
  }
  moveForwards() {
    let taskArr = this.state.tasks[this.state.isSelected].slice();
    const newLocation = (parseInt(taskArr[0]) + 1).toString();
    taskArr = [newLocation, false];
    this.setState({
      tasks: { ...this.state.tasks, [this.state.isSelected]: taskArr },
      isSelected: '',
    });
  }
  clearTasks() {
    this.setState({ tasks: {} });
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
        outputList.push(
          <Task
            key={taskArr[0]}
            title={taskArr[0]}
            clicked={taskArr[1][1]}
            taskClick={() => this.taskClick(taskArr[0])}
            stageId={key}
            moveBackwards={this.moveBackwards}
            moveForwards={this.moveForwards}
            deleteTask={this.deleteTask}
          />
        );
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
        <Button
          className="clear"
          data-testid="app-clear-button"
          onClick={this.clearTasks}
        >
          Clear All Tasks
        </Button>
      </span>
    );
  }
}

export default App;
