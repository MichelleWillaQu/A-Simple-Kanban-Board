import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { waitForDomChange, wait } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Runs before and after each test to set the environment
beforeEach(() => {
  localStorage.setItem(
    'tasks',
    '{"task 1":["0",false],"task 2":["0",false],"task 3":["1",false],"task 4":["2",false]}'
  );
});
afterEach(cleanup);

// Jest: 'it' is equivalent to 'test'
describe('1. Stages rendered', () => {
  it('Backlog stage', () => {
    const { getByTestId } = render(<App />);
    const stageEl = getByTestId('stage-0');
    expect(stageEl.getAttribute('name')).toBe('Backlog');
  });
  it('To do stage', () => {
    const { getByTestId } = render(<App />);
    const stageEl = getByTestId('stage-1');
    expect(stageEl.getAttribute('name')).toBe('To do');
  });
  it('Ongoing stage', () => {
    const { getByTestId } = render(<App />);
    const stageEl = getByTestId('stage-2');
    expect(stageEl.getAttribute('name')).toBe('Ongoing');
  });
  it('Done stage', () => {
    const { getByTestId } = render(<App />);
    const stageEl = getByTestId('stage-3');
    expect(stageEl.getAttribute('name')).toBe('Done');
  });
});

describe('2. Dummy tasks (in localStorageMock) rendered', () => {
  it('shows task 1', async () => {
    const { getByTestId } = render(<App />);
    await wait(() => {
      const taskEl = getByTestId('task-task-1');
      const stageEl = getByTestId('stage-0');
      expect(taskEl).toBeInTheDocument();
      expect(stageEl.contains(taskEl)).toBeTruthy();
      expect(taskEl.textContent).toBe('task 1');
    });
  });
  it('shows task 2', async () => {
    const { getByTestId } = render(<App />);
    await wait(() => {
      const taskEl = getByTestId('task-task-2');
      const stageEl = getByTestId('stage-0');
      expect(taskEl).toBeInTheDocument();
      expect(stageEl.contains(taskEl)).toBeTruthy();
      expect(taskEl.textContent).toBe('task 2');
    });
  });
  it('shows task 3', async () => {
    const { getByTestId } = render(<App />);
    await wait(() => {
      const taskEl = getByTestId('task-task-3');
      const stageEl = getByTestId('stage-1');
      expect(taskEl).toBeInTheDocument();
      expect(stageEl.contains(taskEl)).toBeTruthy();
      expect(taskEl.textContent).toBe('task 3');
    });
  });
  it('shows task 4', async () => {
    const { getByTestId } = render(<App />);
    await wait(() => {
      const taskEl = getByTestId('task-task-4');
      const stageEl = getByTestId('stage-2');
      expect(taskEl).toBeInTheDocument();
      expect(stageEl.contains(taskEl)).toBeTruthy();
      expect(taskEl.textContent).toBe('task 4');
    });
  });
});

// Would typically test every stage via a loop, but all the stages are identical except the name
describe('3. Added a Task to Stage 0', () => {
  it('shows the Add Task button under Stage 0', () => {
    const { getByTestId } = render(<App />);
    const stageEl = getByTestId('stage-0');
    const addButtonEl = getByTestId('stage-0-add-button');
    expect(addButtonEl).toBeInTheDocument();
    expect(stageEl.contains(addButtonEl)).toBeTruthy();
  });
  it('hides the Add Task button on click', () => {
    const { getByTestId } = render(<App />);
    const addButtonEl = getByTestId('stage-0-add-button');
    fireEvent.click(addButtonEl);
    expect(addButtonEl.hidden).toBeTruthy();
  });
  it('shows New Task Input and Confirm after an Add Task click', () => {
    // queryByTestId can be null unlike getByTestId
    const { getByTestId, queryByTestId } = render(<App />);
    const stageEl = getByTestId('stage-0');
    const addButtonEl = getByTestId('stage-0-add-button');
    fireEvent.click(addButtonEl);
    const inputEl = queryByTestId('stage-0-new-task-input');
    const confirmEl = queryByTestId('stage-0-new-task-input-confirm');
    expect(inputEl).toBeInTheDocument();
    expect(confirmEl).toBeInTheDocument();
    expect(stageEl.contains(inputEl)).toBeTruthy();
    expect(stageEl.contains(confirmEl)).toBeTruthy();
  });
  it('adds a new task upon New Task Confirm click', async () => {
    const { getByTestId, unmount } = render(<App />);
    const addButtonEl = getByTestId('stage-0-add-button');
    fireEvent.click(addButtonEl);
    const inputEl = getByTestId('stage-0-new-task-input');
    inputEl.value = 'task 5';
    fireEvent.change(inputEl);
    const confirmEl = getByTestId('stage-0-new-task-input-confirm');
    fireEvent.click(confirmEl);
    const newTask = getByTestId('task-task-5');
    expect(newTask).toBeInTheDocument();
    unmount();
    expect(Object.keys(JSON.parse(localStorage.tasks)).length).toBe(5);
    expect(
      Object.keys(JSON.parse(localStorage.tasks)).includes('task 5')
    ).toBeTruthy();
  });
  it('shows the Add Task button again after New Task Submit', async () => {
    const { getByTestId } = render(<App />);
    const addButtonEl = getByTestId('stage-0-add-button');
    fireEvent.click(addButtonEl);
    const inputEl = getByTestId('stage-0-new-task-input');
    inputEl.value = 'task 5';
    fireEvent.change(inputEl);
    const confirmEl = getByTestId('stage-0-new-task-input-confirm');
    fireEvent.click(confirmEl);
    await waitForDomChange({ addButtonEl }).then(() => {
      // Add Task button reappears as the DOM rerenders
      expect(addButtonEl.hidden).toBeFalsy();
    });
  });
});

describe('4. Clicking on a task brings up task options', () => {
  it('shows that Stage 0 tasks have 2 buttons: forwards and delete', () => {
    const { getByTestId, queryByTestId } = render(<App />);
    const stageEl = getByTestId('stage-0');
    const taskEl = getByTestId('task-task-1');
    fireEvent.click(taskEl);
    const forwardsEl = getByTestId('stage-0-move-right');
    const deleteEl = getByTestId('stage-0-delete');
    expect(queryByTestId('stage-0-move-left')).not.toBeInTheDocument();
    expect(forwardsEl).toBeInTheDocument();
    expect(stageEl.contains(forwardsEl)).toBeTruthy();
    expect(deleteEl).toBeInTheDocument();
    expect(stageEl.contains(deleteEl)).toBeTruthy();
  });
  it('shows that Stage 1 tasks have 3 buttons: backwards, forwards, and delete', () => {
    const { getByTestId } = render(<App />);
    const stageEl = getByTestId('stage-1');
    const taskEl = getByTestId('task-task-3');
    fireEvent.click(taskEl);
    const backwardsEl = getByTestId('stage-1-move-left');
    const forwardsEl = getByTestId('stage-1-move-right');
    const deleteEl = getByTestId('stage-1-delete');
    expect(backwardsEl).toBeInTheDocument();
    expect(stageEl.contains(backwardsEl)).toBeTruthy();
    expect(forwardsEl).toBeInTheDocument();
    expect(stageEl.contains(forwardsEl)).toBeTruthy();
    expect(deleteEl).toBeInTheDocument();
    expect(stageEl.contains(deleteEl)).toBeTruthy();
  });
  it('shows that Stage 3 tasks have 2 buttons: backwards and delete', () => {
    const { getByTestId, queryByTestId } = render(<App />);
    // Add a new task in Stage 4 (there is none currently)
    const addButtonEl = getByTestId('stage-3-add-button');
    fireEvent.click(addButtonEl);
    const inputEl = getByTestId('stage-3-new-task-input');
    inputEl.value = 'task 5';
    fireEvent.change(inputEl);
    const confirmEl = getByTestId('stage-3-new-task-input-confirm');
    fireEvent.click(confirmEl);
    // Start the check for task buttons
    const stageEl = getByTestId('stage-3');
    const taskEl = getByTestId('task-task-5');
    fireEvent.click(taskEl);
    const backwardsEl = getByTestId('stage-3-move-left');
    const deleteEl = getByTestId('stage-3-delete');
    expect(backwardsEl).toBeInTheDocument();
    expect(stageEl.contains(backwardsEl)).toBeTruthy();
    expect(queryByTestId('stage-3-move-right')).not.toBeInTheDocument();
    expect(deleteEl).toBeInTheDocument();
    expect(stageEl.contains(deleteEl)).toBeTruthy();
  });
});

describe('5. Delete a Task', () => {
  it('can delete task 1', () => {
    const { getByTestId, queryByTestId } = render(<App />);
    const task1El = getByTestId('task-task-1');
    fireEvent.click(task1El);
    const deleteEl = getByTestId('stage-0-delete');
    fireEvent.click(deleteEl);
    expect(queryByTestId('task-task-1')).not.toBeInTheDocument();
  });
});

// describe('6. Move a Task Back and Forth', () => {
//   it('can move task 1 to Stage 1', async () => {
//     const { getByTestId } = render(<App />);
//     const task1El = getByTestId('task-task-1');
//     console.log('3', task1El.outerHTML);
//     fireEvent.click(task1El);
//     const forwardsEl = getByTestId('stage-0-move-right');
//     fireEvent.click(forwardsEl);
//     const stageEl = getByTestId('stage-1');
//     console.log('4', stageEl.outerHTML);
//     console.log('5', task1El.outerHTML);
//     await wait();
//     expect(stageEl.contains(task1El)).toBeTruthy();
//   });
//   it('can move task 3 to Stage 0', async () => {
//     const { getByTestId } = render(<App />);
//     const task1El = getByTestId('task-task-3');
//     fireEvent.click(task1El);
//     const backwardsEl = getByTestId('stage-1-move-left');
//     fireEvent.click(backwardsEl);
//     const stageEl = getByTestId('stage-0');
//     await waitForDomChange({ task1El }).then(() => {
//       expect(stageEl.contains(task1El)).toBeTruthy();
//     });
//   });
// });

describe('7. Clear localStorage with the button', () => {});
