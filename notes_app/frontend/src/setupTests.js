import '@testing-library/jest-dom';

const localStorageMock = (() => {
    let store = {};
  
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  
  Object.defineProperty(global, 'localStorage', { value: localStorageMock });