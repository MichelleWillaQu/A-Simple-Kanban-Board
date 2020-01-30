// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// jest.fn() is a mock function - in this case, I want the local storage mock to do things
const localStorageMock = (function() {
  let store = {
    'task 1': ['0', false],
    'task 2': ['0', false],
    'task 3': ['1', false],
    'task 4': ['2', false],
  };
  return {
    getItem: function(key) {
      return JSON.parse(store[key]) || null;
    },
    setItem: function(key, value) {
      store[key] = JSON.stringify(value);
    },
    clear: function() {
      store = {};
    },
  };
})();
global.localStorage = localStorageMock;
